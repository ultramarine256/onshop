import { Injectable } from '@angular/core';
import { CartItemEntity } from './entities';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /// fields
  private _itemsPrice = 0;
  private _items: Array<CartItemEntity> = [];

  /// properties
  get totalPrice() {
    return this._itemsPrice;
  }

  get itemsCount() {
    let count = 0;
    for (const item of this._items) {
      count += item.count;
    }
    return count;
  }

  get items(): Array<CartItemEntity> {
    return this._items;
  }

  /// constructor
  constructor() {
    const items = JSON.parse(localStorage.getItem(Constants.CART_KEY));
    this._items = items ? items : [];
    this._itemsPrice = this.calculatePrice(this._items);
  }

  /// methods
  public addItem(item: CartItemEntity, amount: number = 1) {
    item.count = amount;
    const index = this._items.findIndex((r) => r.id === item.id && !r.duration && !item.duration);
    if (index > -1) {
      this._items[index].count++;
      this._items[index].price += Number(item.price);
    } else {
      this._items.push(item);
    }

    this._itemsPrice = this.calculatePrice(this._items);
    localStorage.setItem(Constants.CART_KEY, JSON.stringify(this._items));
  }

  public removeItem(id: number) {
    const index = this._items.findIndex((r) => r.id === id);
    if (index > -1) {
      this._items.splice(index, 1);
      this._itemsPrice = this.calculatePrice(this._items);
      localStorage.setItem(Constants.CART_KEY, JSON.stringify(this._items));
    }
  }

  public clearCart() {
    this._items = [];
    this._itemsPrice = 0;
    localStorage.setItem(Constants.CART_KEY, JSON.stringify([]));
  }

  /// helpers
  private calculatePrice(items: Array<CartItemEntity>): number {
    let price = 0;
    for (const item of items) {
      price += Math.round(Number(item.price));
    }
    return price;
  }
}

const Constants = {
  CART_KEY: 'onshop-cart-key',
};
