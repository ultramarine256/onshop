import {CarouselItemModel, CartItemEntity, Product} from '../../_domain';
import {CategoryModel, ProductModel} from '../../_data';

export class AppMapper {
  public static toCartItem(entity: ProductModel): CartItemEntity {
    const result = new CartItemEntity();
    result.id = entity.id;
    result.slug = entity.slug;
    result.imageUrl = entity.firstImage;
    result.title = entity.name;
    result.price = Number(entity.price);
    return result;
  }

  public static ToProducts(entities: Array<ProductModel>): Array<Product> {
    const result = new Array<Product>();
    for (let i = 0; i < entities.length; i++) {
      result[i] = new Product();
      result[i].id = entities[i].id;
      result[i].slug = entities[i].slug;
      result[i].name = entities[i].name;
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
