import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {finalize, map} from 'rxjs/operators';
import {ProductFilter, ProductRepository, ProductModel} from '../../../_data';
import {AppMapper} from '../../_mapper';
import {AuthService, CartService, OWL_CAROUSEL} from '../../../_domain';

@Component({
  selector: 'app-product-details-page',
  styleUrls: ['./product-details-page.component.scss'],
  templateUrl: './product-details-page.component.html'
})
export class ProductDetailsPageComponent implements OnInit {
  /// fields
  public product: ProductModel;
  public relatedProducts: Array<ProductModel> = [];

  /// predicates
  public isLoaded = false;
  public relatedIsLoaded = false;

  /// lifecycle
  constructor(private productRepository: ProductRepository,
              private route: ActivatedRoute,
              private cartService: CartService,
              public authService: AuthService) {
    this.product = new ProductModel();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.productRepository.getProducts(new ProductFilter({slug: params.slug}))
        .pipe(finalize(() => this.isLoaded = true))
        .pipe(finalize(() => setTimeout(() => (window as any).$('.product-images').owlCarousel(OWL_CAROUSEL.PRODUCT_IMAGES), 200)))
        .pipe(map(x => x.items[0]))
        .subscribe(item => {
          this.product = item;
          console.log(item);
          this.productRepository.getProducts(new ProductFilter({include: this.product.relatedIds.join(',')}))
            .pipe(finalize(() => this.relatedIsLoaded = true))
            .pipe(finalize(() => setTimeout(() => (window as any).$('.related-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS), 200)))
            .subscribe(result => this.relatedProducts = result.items);
        }));
  }

  /// methods
  public addToCart(item: ProductModel) {
    this.cartService.addItem(AppMapper.toCartItem(item));
  }

  /// helpers
}
