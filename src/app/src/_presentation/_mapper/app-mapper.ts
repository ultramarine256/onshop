import { ProductModel } from '@data/repository';
import { CartItemEntity, CartItemForRentEntity, CartItemForSaleEntity } from '@domain/cart/cart-item.entity';
import { Product } from '@domain/models/product.model';

export class AppMapper {
  public static toCartForRentItem(
    entity: ProductModel,
    duration: number,
    dateFrom: Date,
    dateTo: Date
  ): CartItemEntity {
    return new CartItemForRentEntity(entity, duration, dateFrom, dateTo);
  }

  public static toCartForSaleItem(entity: ProductModel, count?: number): CartItemEntity {
    return new CartItemForSaleEntity(entity, count);
  }

  public static ToProducts(entities: Array<ProductModel>): Array<Product> {
    const result = new Array<Product>();
    for (let i = 0; i < entities.length; i++) {
      result[i] = new Product();
      result[i].id = entities[i].id;
      result[i].slug = entities[i].slug;
      result[i].name = entities[i].name;
      result[i].firstImage = entities[i].firstImage;
      result[i].price = Number(entities[i].price);
    }
    return result;
  }

  static mapFromMany(dtos: Array<any>): Array<ProductModel> {
    const result = [];
    for (const dto of dtos) {
      const entity = new ProductModel();
      entity.mapFromDto(dto);
      result.push(entity);
    }
    return result;
  }
}
