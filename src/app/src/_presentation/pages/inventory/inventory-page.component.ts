import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import {
  CategoryModel,
  ProductModel,
  ProductFilter,
  ProductRepository,
  ProductSearchResult,
  CategoryRepository,
  SearchResultFilters,
} from '@data/index';
import { AppMapper } from '@presentation/_mapper/app-mapper';
import { AuthService, CartService, SortingOption } from '@domain/index';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

interface FilterState {
  productFilter: ProductFilter;
  dynamicFilter: string;
}

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html',
})
export class InventoryPageComponent extends UnsubscribeMixin() implements OnInit {
  public filterUpdated$ = new Subject<{ productFilter: ProductFilter; dynamicFilter: string }>();

  public searchResult = new ProductSearchResult();
  public products: ProductModel[];
  public category: CategoryModel = new CategoryModel();
  public filter: SearchResultFilters;
  public readonly paginationConfig = { itemsPerPage: 12 };

  public showCategories: boolean;
  public isLoading = true;

  private element: HTMLElement;
  private filterState: FilterState;

  constructor(
    private snackBar: MatSnackBar,
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
    const category = this.activatedRoute.snapshot.params.categoryId ? +this.activatedRoute.snapshot.params.categoryId : null;

    // Initiate state for filters
    this.filterState = {
      productFilter: new ProductFilter({
        page,
        category,
        per_page: this.paginationConfig.itemsPerPage,
      }),
      dynamicFilter: '',
    };

    // Stream which is responsible for filtering products on the page based on filters
    this.filterUpdated$
      .pipe(
        startWith(this.filterState),
        tap(() => {
          this.scrollToView();
          this.isLoading = true;
        }),
        switchMap((filterState: FilterState) =>
          this.productRepository.getProducts(filterState.productFilter, filterState.dynamicFilter).pipe(
            tap(() => {
              this.isLoading = false;
              this.filterState = filterState;
              this.updateUrl(filterState);
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.filter = data.filters;
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

  public onFilterChanged(dynamicFilter: string) {
    const filterState = { ...this.filterState };
    filterState.productFilter.page = 1;
    filterState.dynamicFilter = dynamicFilter;
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
    this.element = document.getElementById('scrollView') as HTMLElement;
    this.element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  public get currentPage(): number {
    return this.filterState.productFilter.page;
  }

  public get totalResults(): number {
    return this.searchResult.totalCount;
  }
}
