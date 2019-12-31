import {Injectable} from '@angular/core';
import {CartItemEntity} from './entities';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /// fields
  private _itemsPrice = 0;
  private items: Array<CartItemEntity> = [];

  /// properties
  get itemsCount() {
    return this.items.length;
  }

  get itemsPrice() {
    return this._itemsPrice;
  }

  /// constructor
  constructor() {
  }

  /// methods
  public getItems() {
    return this.items;
  }

  public addItem(item: CartItemEntity) {
    this.items.push(item);
  }

  public addItems(items: Array<CartItemEntity>) {
    for (const item of items) {
      this.items.push(item);
    }
  }

  public removeItem(id: number) {
    // let item = this.itemsPrice.inde
    // this.items.push(item);
  }

  public clearCart() {
    this.items = [];
  }
}
