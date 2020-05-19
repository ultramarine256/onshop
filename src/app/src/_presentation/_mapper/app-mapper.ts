import { CartItemEntity, Product } from '../../_domain';
import { ProductModel } from '../../_data';

export class AppMapper {
  public static toCartItem(entity: ProductModel): CartItemEntity {
    return new CartItemEntity(entity);
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
