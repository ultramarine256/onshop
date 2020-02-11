import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService, CategoryEntity, ProductEntity} from '../../../_core';
import {ProductFilter, ShopRepository} from '../../../_data';
import {InventoryFilter, InventoryFilter__Mocks} from './inventory-filter';
import {AppMapper} from '../../_mapper';

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

  /// predicates
  public isLoading = true;
  public categoryIsEmpty = false;

  /// constructor
  constructor(private shopRepository: ShopRepository,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) {
    this.filter = InventoryFilter__Mocks.DefauiltFilter__Mock();
  }

  ngOnInit(): void {
    // category: 'category-1'
    this.shopRepository.getProducts(new ProductFilter({perPage: 100})).subscribe(items => {
      this.items = items;
      if (items.length === 0) {
        this.categoryIsEmpty = true;
      }
      this.isLoading = false;
    });

    this.route.params.subscribe(params =>
      this.shopRepository.getCategoryBySlug(params.categorySlug).subscribe(item => this.category = item));
  }

  /// methods
  public productClick(slug: string, event: any) {
    const classList = event.target.classList as DOMTokenList;
    if (classList.contains('add-to-cart') || classList.contains('material-icons-outlined')) {
      return;
    }

    this.router.navigate([`product/${slug}`]).then();
  }

  /// methods
  public addToCart(item: ProductEntity) {
    this.cartService.addItem(AppMapper.toCartItem(item));
  }
}
