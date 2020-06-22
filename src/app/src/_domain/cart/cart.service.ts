import { Injectable } from '@angular/core';

import { ProductService } from '@domain/services/product.service';
import { CartItemEntity, CartItemForRentEntity, CartItemForSaleEntity } from '@domain/cart/cart-item.entity';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items: CartItemEntity[];

  public get itemsCount(): number {
    return this._items.reduce((acc, cartItem) => {
      return (acc += cartItem.count);
    }, 0);
  }

  public get totalPrice(): number {
    return this._items.length
      ? this._items.reduce((acc, item) => {
          return (acc += (item as CartItemForRentEntity).duration
            ? this.productService.getPriceForRent(
                (item as CartItemForRentEntity).rentRates,
                (item as CartItemForRentEntity).duration
              )
            : this.productService.getPriceForSale(item.price, item.count));
        }, 0)
      : 0;
  }

  constructor(private productService: ProductService) {
    const items = JSON.parse(localStorage.getItem(CONSTANTS.CART_KEY));
    this._items = items ? items : [];
  }

  public get items(): Array<CartItemEntity> {
    return this._items;
  }

  public get itemsForSale(): Array<CartItemForSaleEntity> {
    return this._items.filter((item) => !(item as CartItemForRentEntity).duration) as CartItemForSaleEntity[];
  }

  public get itemsForRent(): Array<CartItemForRentEntity> {
    return this._items.filter((item) => (item as CartItemForRentEntity).duration) as CartItemForRentEntity[];
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

  public getItem(uid: string): CartItemEntity {
    return this._items.find((item) => item.uid === uid);
  }

  public removeItem(uid: string) {
    this.updateItems(this._items.filter((item) => item.uid !== uid));
  }

  public clearCart() {
    this.updateItems([]);
  }

  public updateItems(items: CartItemEntity[]) {
    this._items = items;
    localStorage.setItem(CONSTANTS.CART_KEY, JSON.stringify(this._items));
  }

  public updateItem(cartItem: CartItemEntity) {
    const items = this._items.map((item) => {
      return item.uid === cartItem.uid ? cartItem : item;
    });
    this.updateItems(items);
  }
}

const CONSTANTS = {
  CART_KEY: 'onshop-cart-key',
};
