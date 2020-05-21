import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { distinctUntilChanged, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import {
  CategoryModel,
  ProductModel,
  ProductFilter,
  ProductRepository,
  ProductSearchResult,
  CategoryRepository,
  SearchResultFilters,
  TagModel,
} from '@data/index';
import { AppMapper } from '@presentation/_mapper/app-mapper';
import { AuthService, CartService, FilterFormData, InventoryFiltersComponent, SortingOption } from '@domain/index';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

interface FilterState {
  productFilter: ProductFilter;
}

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html',
})
export class InventoryPageComponent extends UnsubscribeMixin() implements OnInit {
  public filterUpdated$ = new Subject<{ productFilter: ProductFilter }>();

  public searchResult = new ProductSearchResult();
  public category: CategoryModel = new CategoryModel();
  public filter: SearchResultFilters;
  public filters: { minPrice: number; maxPrice: number };
  public tags: TagModel[];
  public isInProgress: boolean;

  public readonly paginationConfig = { itemsPerPage: 12 };

  public isFirstLoading = true;

  private element: HTMLElement;
  private filterState: FilterState;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    const page = this.activatedRoute.snapshot.queryParams.page ? +this.activatedRoute.snapshot.queryParams.page : 1;
    const category = this.activatedRoute.snapshot.params.categoryId
      ? +this.activatedRoute.snapshot.params.categoryId
      : null;

    // Initiate state for filters
    this.filterState = {
      productFilter: new ProductFilter({
        page,
        category,
        per_page: this.paginationConfig.itemsPerPage,
      }),
    };

    this.productRepository
      .getTags()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tags) => {
        this.tags = tags;
      });

    // Stream which is responsible for filtering products on the page based on filters
    this.filterUpdated$
      .pipe(
        startWith(this.filterState),
        tap(() => (this.isInProgress = true)),
        switchMap((filterState: FilterState) =>
          this.productRepository.getProducts(filterState.productFilter).pipe(
            tap(() => {
              this.isFirstLoading = false;
              this.isInProgress = false;
              this.filterState = filterState;
              this.updateUrl(filterState);
            }),
            finalize(() => this.scrollToView())
          )
        ),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        const prices = data.items.map((item) => item.price);
        // TODO: Load min & max price from server
        const minPrice = Math.round(Math.min(...prices)) || 0;
        const maxPrice = Math.round(Math.max(...prices)) || 9999;
        this.filters = { minPrice, maxPrice };
        console.log(data);
        this.searchResult = data;
      });
  }

  public onPageChanged(page: number) {
    const filterState = { ...this.filterState };
    filterState.productFilter.page = page;
    this.filterUpdated$.next(filterState);
  }

  public onSortTypeChanged($event: SortingOption) {
    const filterState = { ...this.filterState };
    filterState.productFilter.order = $event.property;
    filterState.productFilter.orderby = $event.name;
    this.filterUpdated$.next(filterState);
  }

  public onFilterChanged($event: FilterFormData) {
    const filterState = { ...this.filterState };
    filterState.productFilter.min_price = $event.price[0];
    filterState.productFilter.max_price = $event.price[1];
    filterState.productFilter.stock_status = $event.stockStatus;
    filterState.productFilter.tag = $event.tag;
    filterState.productFilter.on_sale = $event.forSale;
    filterState.productFilter.attribute_term = $event.forRent ? RentOption.Day : null;
    this.filterUpdated$.next(filterState);
  }

  public onAddedToCart(product: ProductModel) {
    if (!product) {
      this.router.navigate(['/login']);
    }
    this.cartService.addItem(AppMapper.toCartItem(product));
  }

  private updateUrl(productFilter: FilterState) {
    this.router.navigate([], {
      queryParams: { page: productFilter.productFilter.page },
    });
  }

  private scrollToView() {
    if (!document.getElementById('scrollView')) {
      return;
    }
    this.element = document.getElementById('scrollView') as HTMLElement;
    this.element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  public get currentPage(): number {
    return this.filterState.productFilter.page;
  }

  public get totalResults(): number {
    return this.searchResult.totalCount;
  }

  // TODO: Implement
  public openFilters() {
    const dialogRef = this.dialog.open(InventoryFiltersComponent, {
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters) => {});
  }
}

export enum RentOption {
  Day = '4',
  Week = '5',
  Month = '6',
}
