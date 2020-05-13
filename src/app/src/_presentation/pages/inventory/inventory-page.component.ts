import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {
  CategoryModel,
  ProductModel,
  ProductFilter,
  ProductRepository,
  ProductSearchResult,
  CategoryRepository,
  SearchResultFilters
} from '../../../_data';
import {AppMapper} from '../../_mapper';
import {AuthService, CartService, FilterAttribute, FilterCategory, InventoryFilter, PriceRange} from '../../../_domain';

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent implements OnInit {
  /// fields
  public items: Array<ProductModel> = [];
  public category: CategoryModel = new CategoryModel();
  public filter: SearchResultFilters;
  public setFilters: ProductFilter;
  public searchResult: ProductSearchResult;
  public itemFilters: any;
  public categoryId: number;
  public sortChanged: number;
  public setCurrentFilter: string;

  /// predicates
  public isLoading = true;
  public pagination = {setPage: 1, setAmount: 12};
  public dynamicFilterSave = '';
  public showCategories: true;
  public element: HTMLElement;


  /// constructor
  constructor(private productRepository: ProductRepository,
              private categoryRepository: CategoryRepository,
              private cartService: CartService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.searchResult = new ProductSearchResult();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.pagination.setPage = Number(res.page) || 1;
      this.dynamicFilterSave = res.dynamicFilter || '';
      this.setCurrentFilter = res.sortingBar || '';
      this.setFilters = new ProductFilter({
        page: Number(res.page),
        per_page: 12,
        orderby: res.orderBy,
        order: res.order
      });
    });

    this.route.params.subscribe(params => {
      this.productRepository.getFiltersProduct(0).subscribe(res => {
        this.itemFilters = res;
      });
      this.categoryId = params.cacategoryId;
      this.categoryRepository.getCategory(params.categoryId).subscribe(item => {
        this.category = item;
      });
      if (params.categoryId.toString() === 'all') {
        this.showCategories = true;
        this.productRepository.getProducts(new ProductFilter(this.setFilters),
          this.dynamicFilterSave)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(result => {
            const filterResult = result.filters.filterItems;
            for (let i = 0; i < filterResult.length; i++) {
              if (filterResult[i].name === 'category') {
                const temp = filterResult[0];
                filterResult[0] = filterResult[i];
                filterResult[i] = temp;
              }
            }
            this.filter = result.filters;
            this.searchResult = result;
            this.sortChanged = this.pagination.setPage;
          });
      } else {
        this.productRepository.getProducts(new ProductFilter(this.setFilters), null)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(result => {
            this.filter = result.filters;
            this.searchResult = result;
            this.sortChanged = this.pagination.setPage;
          });
      }
    });
  }

  public filtersChanged(dynamicFilter: string, page: any, sorting: any) {
    this.isLoading = true;
    this.scrollToView();
    if (dynamicFilter) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          dynamicFilter
        },
        queryParamsHandling: 'merge',
      });
      this.dynamicFilterSave = dynamicFilter;
      this.setFilters.page = 1;
    } else if (page) {
      this.sortChanged = page.setPage;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: page.setPage
        },
        queryParamsHandling: 'merge',
      });
      this.setFilters.page = page.setPage;
    } else if (sorting) {
      this.sortChanged = 1;
      if (sorting.name !== 'all') {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            sortingBar: sorting.title,
            orderBy: sorting.name,
            order: sorting.property,
            page: 1
          },
          queryParamsHandling: 'merge',
        });
        this.setFilters.orderby = sorting.name;
        this.setFilters.order = sorting.property;
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            sortingBar: null,
            orderBy: null,
            order: null,
            page: 1
          },
          queryParamsHandling: 'merge',
        });
        this.setFilters.orderby = null;
        this.setFilters.order = null;
      }
      this.setFilters.page = 1;
    }

    this.productRepository.getProducts(this.setFilters, dynamicFilter)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(result => {
        this.filter = result.filters;
        this.searchResult = result;
        this.dynamicFilterSave = dynamicFilter;
      });
  }

  /// methods

  public addToCart(item: ProductModel) {
    if (!item) {
      (window as any).toastr.options.positionClass = 'toast-bottom-right';
      (window as any).toastr.info('Login to make shopping');
    } else {
      this.cartService.addItem(AppMapper.toCartItem(item));
    }
  }

  public scrollToView() {
    this.element = document.getElementById('scrollView') as HTMLElement;
    this.element.scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
