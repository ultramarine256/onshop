import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {finalize, map} from 'rxjs/operators';
import {CartService} from '../../../_core';
import {ProductFilter, ProductRepository} from '../../../_data';
import {AppMapper} from '../../_mapper';
import {OWL_CAROUSEL} from '../../../_domain';
import {ProductModel} from '../../../_data/repository/product/model';

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
              private cartService: CartService) {
    this.product = new ProductModel();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.productRepository.getProducts(new ProductFilter({slug: params.slug}))
        .pipe(finalize(() => this.isLoaded = true))
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
}
