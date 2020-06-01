import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CartItemForRentEntity, CartService } from '../../../_domain';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { ProductService } from '@domain/services/product/product.service';

@Component({
  selector: 'app-cart-page',
  styleUrls: ['./cart-page.component.scss'],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent extends UnsubscribeMixin() implements OnInit {
  public cartForm: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService, private productService: ProductService) {
    super();
  }

  ngOnInit() {
    this.cartForm = this.fb.group({
      products: this.fb.array(
        this.cartService.items.map((product) => {
          return this.fb.group({
            duration: [(product as CartItemForRentEntity).duration, Validators.min(1)],
            rentRates: (product as CartItemForRentEntity).rentRates,
            count: [product.count, Validators.min(1)],
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            id: product.id,
            uid: product.uid,
            slug: product.slug,
          });
        })
      ),
    });
  }

  public removeProduct(uid: string, index: number) {
    (this.cartForm.controls.products as FormArray).removeAt(index);
    this.cartService.removeItem(uid);
  }

  public get totalPrice(): number {
    return this.cartForm.controls.products.value.reduce((acc, item) => {
      return (acc += item.duration
        ? this.getPriceForRent(item.rentRates, item.duration)
        : this.getPriceForSale(item.price, item.count));
    }, 0);
  }

  public getPriceForRent(rentRates, duration) {
    return this.productService.getPriceForRent(rentRates, duration);
  }

  public getPriceForSale(price: number, count: number) {
    return this.productService.getPriceForSale(price, count);
  }
}
