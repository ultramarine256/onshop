import { Injectable } from '@angular/core';

import { CartItemEntity, CartItemForRentEntity, CartItemForSaleEntity } from './entities';

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
    return this._items.reduce((acc, cartItem) => {
      return (acc += cartItem.count);
    }, 0);
  }

  get items(): Array<CartItemEntity> {
    return this._items;
  }

  get itemsForSale(): Array<CartItemForSaleEntity> {
    return this._items.filter((item) => !(item as CartItemForRentEntity).duration) as CartItemForSaleEntity[];
  }

  get itemsForRent(): Array<CartItemForRentEntity> {
    return this._items.filter((item) => (item as CartItemForRentEntity).duration) as CartItemForRentEntity[];
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
      (cartItem as CartItemForRentEntity).duration
        ? item.id === cartItem.id && (item as CartItemForRentEntity).duration
        : item.id === cartItem.id && !(item as CartItemForRentEntity).duration
    );

    // if the product is not found, then add it to the array with the products, or modify the one that you found
    const items = !product
      ? this._items.concat(cartItem)
      : this._items.map((item) => {
          // depending on the purchase or lease, you need to summarize the appropriate fields
          // add up the prices and duration for rent, or the amount for sale
          const updatedProduct = (cartItem as CartItemForRentEntity).duration
            ? {
                ...product,
                price: product.price + cartItem.price,
                duration: (product as CartItemForRentEntity).duration + (cartItem as CartItemForRentEntity).duration,
              }
            : { ...product, price: product.price + cartItem.price, count: product.count + 1 };
          return (
            (cartItem as CartItemForRentEntity).duration
              ? item.id === cartItem.id && (item as CartItemForRentEntity).duration
              : item.id === cartItem.id && !(item as CartItemForRentEntity).duration
          )
            ? updatedProduct
            : item;
        });

    this.updateItems(items as CartItemEntity[]);
  }

  public updateItem(cartItem: CartItemEntity) {
    const items = this.items.map((item) => {
      return item.uid === cartItem.uid ? cartItem : item;
    });
    this.updateItems(items);
  }

  public removeItem(uid: string) {
    this.updateItems(this._items.filter((item) => item.uid !== uid));
  }

  public clearCart() {
    this.updateItems([]);
  }

  public updateItems(items: CartItemEntity[]) {
    this._items = items;
    this.calculatePrice(this._items);

    localStorage.setItem(Constants.CART_KEY, JSON.stringify(this._items));
  }

  /// helpers
  private calculatePrice(items: CartItemEntity[] = []) {
    this._itemsPrice = items.length
      ? items.reduce((acc, item) => {
          return (acc += +item.price.toFixed(2));
        }, 0)
      : 0;
  }
}

const Constants = {
  CART_KEY: 'onshop-cart-key',
};
