import {CartItemEntity, ProductEntity} from '../../_core';

export class AppMapper {
  public static toCartItem(entity: ProductEntity): CartItemEntity {
    const result = new CartItemEntity();
    result.id = entity.id;
    result.imageUrl = entity.firstImage;
    result.title = entity.name;
    result.price = entity.price;
    return result;
  }
}
