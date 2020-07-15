import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import {
  CategoryModel,
  ProductFilter,
  ProductRepository,
  ProductSearchResult,
  CategoryRepository,
  SearchResultFilters,
  TagModel
} from '@data/index';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { FilterDialogComponent } from '@presentation/inventory/filter-dialog/filter-dialog.component';
import { FormControl } from '@angular/forms';
import { FilterFormData } from '@domain/modules/shop/inventory-filters/inventory-filters.component';
import { CartService } from '@domain/cart/cart.service';
import { SortingOption } from '@domain/modules/shop/sorting-bar/sorting-bar.component';

interface FilterState {
  productFilter: ProductFilter;
}

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory.component.scss'],
  templateUrl: './inventory.component.html'
})
export class InventoryComponent extends UnsubscribeMixin() implements OnInit {
  public filterUpdated$ = new Subject<{ productFilter: ProductFilter }>();

  public searchResult = new ProductSearchResult();
  public category: CategoryModel = new CategoryModel();
  public filter: SearchResultFilters;
  public itemsPerPage = new FormControl(25);
  public filters: { minPrice: number; maxPrice: number };
  public tags: TagModel[];
  public isInProgress: boolean;
  public showTags: boolean;
  public bredCrumbCategory: string;
  public categoryId: number;
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
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (!params.categoryId) {
        this.showTags = true;
      }
      this.categoryId = params.categoryId;
      // Initiate state for filters
      this.filterState = {
        productFilter: new ProductFilter({
          page: this.activatedRoute.snapshot.queryParams?.page || 1,
          category: !params.categoryId ? '' : params.categoryId,
          per_page: this.itemsPerPage.value
        })
      };

      this.filterUpdated$.next(this.filterState);
    });

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
        const minPrice = 0;
        const maxPrice = 5000;
        this.filters = { minPrice, maxPrice };
        this.searchResult = data;
        this.bredCrumbCategory = this.searchResult.items[0].categories[0].name;
        //
      });
  }

  public onPageChanged(page: number) {
    const filterState = { ...this.filterState };
    filterState.productFilter.page = page;
    this.filterUpdated$.next(filterState);
  }

  public onItemsPerPageChanged(number: number) {
    const filterState = { ...this.filterState };
    filterState.productFilter.per_page = number;
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
    filterState.productFilter.tag = $event.tag;
    filterState.productFilter.on_sale = $event.forSale;

    if ($event.forRent) {
      filterState.productFilter.attribute = 'pa_rent__is-rentable';
      filterState.productFilter.attribute_term = 'true';
    }

    this.filterUpdated$.next(filterState);
  }

  private updateUrl(productFilter: FilterState) {
    this.router.navigate([], {
      queryParams: { page: productFilter.productFilter.page }
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

  public openFilters() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '300px'
    });
    dialogRef.componentInstance.filters = this.filters;
    dialogRef.componentInstance.tags = this.tags;

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => data),
        takeUntil(this.destroy$)
      )
      .subscribe((filters: FilterFormData) => {
        this.onFilterChanged(filters);
      });
  }
}
