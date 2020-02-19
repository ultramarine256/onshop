import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {finalize, map} from 'rxjs/operators';
import {CartService} from '../../../_core';
import {ProductEntity, ProductFilter, ShopRepository} from '../../../_data';
import {AppMapper} from '../../_mapper';
import {OWL_CAROUSEL} from '../../../_domain';

@Component({
  selector: 'app-product-details-page',
  styleUrls: ['./product-details-page.component.scss'],
  templateUrl: './product-details-page.component.html'
})
export class ProductDetailsPageComponent implements OnInit {
  /// fields
  public product: ProductEntity;
  public relatedProducts: Array<ProductEntity> = [];

  /// predicates
  public isLoaded = false;
  public relatedIsLoaded = false;

  /// lifecycle
  constructor(private shopRepository: ShopRepository,
              private route: ActivatedRoute,
              private cartService: CartService) {
    this.product = new ProductEntity();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.shopRepository.getProducts(new ProductFilter({slug: params.slug}))
        .pipe(finalize(() => this.isLoaded = true))
        .pipe(map(x => x.items[0]))
        .subscribe(item => {
          this.product = item;
          console.log(item);
          this.shopRepository.getProducts(new ProductFilter({include: this.product.relatedIds.join(',')}))
            .pipe(finalize(() => this.relatedIsLoaded = true))
            .pipe(finalize(() => setTimeout(() => (window as any).$('.related-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS), 200)))
            .subscribe(result => this.relatedProducts = result.items);
        }));
  }

  /// methods
  public addToCart(item: ProductEntity) {
    this.cartService.addItem(AppMapper.toCartItem(item));
  }
}
