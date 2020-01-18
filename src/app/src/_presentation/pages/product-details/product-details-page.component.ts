import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductEntity, CartService} from '../../../_core';
import {ShopRepository} from '../../../_data';
import {AppMapper} from '../../../_domain';

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
    this.route.params.subscribe(params => {
      this.shopRepository.getProductById(params.id).subscribe(data => {
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
