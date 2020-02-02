import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductEntity, CartService} from '../../../_core';
import {ShopRepository} from '../../../_data';
import {AppMapper} from '../../_mapper';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-product-details-page',
  styleUrls: ['./product-details-page.component.scss'],
  templateUrl: './product-details-page.component.html'
})
export class ProductDetailsPageComponent implements OnInit {
  /// fields
  public product: ProductEntity;

  /// predicates
  public didLoaded = false;

  /// lifecycle
  constructor(private shopRepository: ShopRepository,
              private route: ActivatedRoute,
              private cartService: CartService) {
    this.product = new ProductEntity();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.shopRepository.getProductBySlug(params.slug)
        .pipe(finalize(() => this.didLoaded = true))
        .subscribe(item => this.product = item));
  }

  /// methods
  public addToCart(item: ProductEntity) {
    this.cartService.addItem(AppMapper.toCartItem(item));
  }
}
