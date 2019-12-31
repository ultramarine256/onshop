import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShopApiService, ProductEntity, CartService} from '../../../_core';
import {AppMapper} from '../../domain';

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
  constructor(private shopApiService: ShopApiService,
              private route: ActivatedRoute,
              private cartService: CartService) {
    this.product = new ProductEntity();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shopApiService.getProductById(params.id).subscribe(data => {
        this.product = data;
        this.didLoaded = true;
      });
    });
  }

  /// methods
  public addToCart(item: ProductEntity) {
    this.cartService.addItem(AppMapper.toCartItem(item));
  }
}
