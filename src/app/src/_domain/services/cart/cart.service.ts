import { Injectable } from '@angular/core';

import { CartItemEntity } from './entities';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /// fields
  private _itemsPrice = 0;
  private _items: CartItemEntity[];

  /// properties
  get totalPrice(): number {
    return this._itemsPrice;
  }

  get itemsCount(): number {
    return this._items.reduce((acc, item) => {
      return (acc += item.count);
    }, 0);
  }

  get items(): Array<CartItemEntity> {
    return this._items;
  }

  /// constructor
  constructor() {
    const items = JSON.parse(localStorage.getItem(Constants.CART_KEY));
    this._items = items ? items : [];
    this.calculatePrice(this._items);
  }

  /// methods
  public addItem(cartItem: CartItemEntity) {
    // if the product is added for purchase, we search by identifier without the number of rental days
    // or by identifier and number of rental days

    const product = this._items.find((item) =>
      cartItem.duration ? item.id === cartItem.id && item.duration : item.id === cartItem.id && !item.duration
    );

    // if the product is not found, then add it to the array with the products, or modify the one that you found
    const items = !product
      ? this._items.concat(cartItem)
      : this._items.map((item) => {
          // depending on the purchase or lease, you need to summarize the appropriate fields
          // add up the prices and duration for rent, or the amount for sale
          const updatedProduct = cartItem.duration
            ? { ...product, price: product.price + cartItem.price, duration: product.duration + cartItem.duration }
            : { ...product, price: product.price + cartItem.price, count: product.count + 1 };
          return (
            cartItem.duration ? item.id === cartItem.id && item.duration : item.id === cartItem.id && !item.duration
          )
            ? updatedProduct
            : item;
        });

    this.updateItems(items);
  }

  public removeItem(cartItem: CartItemEntity) {
    this.updateItems(this._items.filter((item) => item.uid !== cartItem.uid));
  }

  public clearCart() {
    this.updateItems([]);
  }

  /// helpers
  private updateItems(items: CartItemEntity[]) {
    this._items = items;
    this.calculatePrice(this._items);

    localStorage.setItem(Constants.CART_KEY, JSON.stringify(this._items));
  }

  private calculatePrice(items: CartItemEntity[] = []) {
    this._itemsPrice = items.length
      ? items.reduce((acc, item) => {
          return (acc += Math.round(item.price));
        }, 0)
      : 0;
  }
}

const Constants = {
  CART_KEY: 'onshop-cart-key',
};
