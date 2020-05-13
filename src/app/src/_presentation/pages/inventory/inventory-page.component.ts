import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

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
import { AuthService, CartService, SetPagination, SortItem } from '@domain/index';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html',
})
export class InventoryPageComponent extends UnsubscribeMixin() implements OnInit {
  public filterUpdated$ = new Subject<{ productFilter: ProductFilter; dynamicFilter: string }>();

  public pagination = { setPage: 1, setAmount: 12 };
  public searchResult = new ProductSearchResult();
  public products: ProductModel[];
  public category: CategoryModel = new CategoryModel();
  public filter: SearchResultFilters;
  public pageCounter: number;

  public showCategories: boolean;
  public isLoading = true;

  private element: HTMLElement;
  private filterState: { productFilter: ProductFilter; dynamicFilter: string };

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
    this.filterState = {
      productFilter: new ProductFilter({
        page: this.pagination.setPage,
        per_page: this.pagination.setAmount,
        category: this.category.id,
      }),
      dynamicFilter: '',
    } as const;

    this.loadProducts(+this.activatedRoute.snapshot.params.categoryId);

    this.filterUpdated$
      .pipe(
        tap(() => {
          this.scrollToView();
          this.isLoading = true;
        }),
        switchMap((filterState) =>
          this.productRepository.getProducts(filterState.productFilter, filterState.dynamicFilter).pipe(
            tap(() => {
              this.isLoading = false;
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

  public onPageChanged($event: SetPagination) {
    const filterState = { ...this.filterState };
    filterState.productFilter.page = $event.setPage;

    this.filterUpdated$.next(filterState);
  }

  public onSortTypeChanged($event: SortItem) {
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

  private loadProducts(categoryId: number) {
    this.showCategories = !categoryId; // show category when we do not have any specific category

    this.isLoading = true;
    this.productRepository
      .getProducts(new ProductFilter({ per_page: this.pagination.setAmount, page: this.pagination.setPage, category: categoryId || null }))
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((productSearchResult) => {
        if (!categoryId) {
          const filterResult = productSearchResult.filters.filterItems;
          for (let i = 0; i < filterResult.length; i++) {
            if (filterResult[i].name === 'category') {
              const temp = filterResult[0];
              filterResult[0] = filterResult[i];
              filterResult[i] = temp;
            }
          }
        }
        this.filter = productSearchResult.filters;
        this.searchResult = productSearchResult;
        this.pageCounter = this.pagination.setPage;
      });
  }

  public onAddedToCart(product: ProductModel) {
    if (!product) {
      this.router.navigate(['/login']);
    }
    this.cartService.addItem(AppMapper.toCartItem(product));
  }

  public scrollToView() {
    this.element = document.getElementById('scrollView') as HTMLElement;
    this.element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}
