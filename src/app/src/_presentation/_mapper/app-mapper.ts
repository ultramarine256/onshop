import {CartItemEntity, ProductEntity} from '../../_core';

export class AppMapper {
  public static toCartItem(entity: ProductEntity): CartItemEntity {
    const result = new CartItemEntity();
    result.id = entity.id;
    result.slug = entity.slug;
    result.imageUrl = entity.firstImage;
    result.title = entity.name;
    result.price = entity.price;
    return result;
  }

  static mapFromMany(dtos: Array<any>): Array<ProductEntity> {
    const result = [];
    for (const dto of dtos) {
      const entity = new ProductEntity();
      entity.mapFromDto(dto);
      result.push(entity);
    }
    return result;
  }
}
