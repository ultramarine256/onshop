import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {CartService} from '../../../_core';
import {CategoryEntity, ProductEntity, ProductFilter, ShopRepository, InventorySearchResult} from '../../../_data';
import {AppMapper} from '../../_mapper';
import {FilterAttribute, FilterCategory, InventoryFilter, PriceRange} from '../../../_domain';

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent implements OnInit {
  /// fields
  public items: Array<ProductEntity> = [];
  public category: CategoryEntity = new CategoryEntity();
  public filter: InventoryFilter;
  public searchResult: InventorySearchResult;

  /// predicates
  public isLoading = true;

  /// events
  public filtersChanged(filter: InventoryFilter) {
    // TODO: update url according to query params
    this.filter = filter;
    // console.log(this.filter);

    // TODO: dynamic filter mapping
    const a = new ProductFilter({
      per_page: 100,
      category: this.category.id,
      min_price: this.filter.priceRange.start,
      max_price: this.filter.priceRange.end,
    });

    this.isLoading = true;
    this.shopRepository.getProducts(a)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(result => this.searchResult = result);
  }

  /// constructor
  constructor(private shopRepository: ShopRepository,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) {
    this.filter = DefaultFilters.Get();
    this.searchResult = new InventorySearchResult();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shopRepository.getCategory(params.categoryId).subscribe(item => this.category = item);
      this.shopRepository.getProducts(new ProductFilter({per_page: 100, category: params.categoryId}))
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(result => this.searchResult = result);
    });
  }

  /// methods
  public productClick(slug: string, event: any) {
    const classList = event.target.classList as DOMTokenList;
    if (classList.contains('add-to-cart') || classList.contains('material-icons-outlined')) {
      return;
    }
    this.router.navigate([`product/${slug}`]).then();
  }

  public addToCart(item: ProductEntity) {
    this.cartService.addItem(AppMapper.toCartItem(item));
  }
}

export class DefaultFilters {
  public static Get(): InventoryFilter {
    const result = new InventoryFilter({
      priceRange: new PriceRange({
        min: 0,
        max: 1000,
        start: 0,
        end: 1000
      }),
      categories: [
        new FilterCategory({
          title: 'Available for Rent',
          attributes: [
            new FilterAttribute({name: 'Yes', isChecked: true, isDisabled: true}),
            new FilterAttribute({name: 'No', isChecked: true, isDisabled: true})
          ]
        }),
        new FilterCategory({
          title: 'Stock Status',
          attributes: [
            new FilterAttribute({name: 'In Stock', isChecked: true, isDisabled: true}),
            new FilterAttribute({name: 'Out of Stock', isChecked: false, isDisabled: true}),
            new FilterAttribute({name: 'On Backorder', isChecked: false, isDisabled: true})
          ]
        })
      ]
    });
    return result;
  }
}
