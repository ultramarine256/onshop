import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { ProductService } from '@domain/services/product.service';
import { CartItemForRentEntity, CartItemForSaleEntity } from '@domain/cart/cart-item.entity';
import { CartService } from '@domain/cart/cart.service';

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html',
})
export class CartComponent extends UnsubscribeMixin() implements OnInit {
  public cartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {
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

  public proceedToCheckout() {
    const values = this.cartForm.value;
    values.products.forEach((value) => {
      const cartItem = this.cartService.getItem(value.uid);
      if (value.duration && value.rentRates) {
        (cartItem as CartItemForRentEntity).duration = value.duration;
      } else {
        (cartItem as CartItemForSaleEntity).count = value.count;
      }
      this.cartService.updateItem(cartItem);
    });
    this.router.navigate(['/checkout']);
  }

  public decreaseCounter(control: any) {
    if (control.value <= 1) {
      return;
    }
    control.setValue(control.value - 1);
  }

  public increaseCounter(control: any) {
    control.setValue(control.value + 1);
  }
}
