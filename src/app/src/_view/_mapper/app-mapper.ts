import {CartItemEntity} from '../../_core';
import {CarouselItemModel, Product} from '../../_domain';
import {CategoryEntity, ProductEntity} from '../../_data';

export class AppMapper {
  public static toCartItem(entity: ProductEntity): CartItemEntity {
    const result = new CartItemEntity();
    result.id = entity.id;
    result.slug = entity.slug;
    result.imageUrl = entity.firstImage;
    result.title = entity.name;
    result.price = Number(entity.price);
    return result;
  }

  public static ToProducts(entities: Array<ProductEntity>): Array<Product> {
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

  static mapFromMany(dtos: Array<any>): Array<ProductEntity> {
    const result = [];
    for (const dto of dtos) {
      const entity = new ProductEntity();
      entity.mapFromDto(dto);
      result.push(entity);
    }
    return result;
  }

  public static categoriesToCarouselItem(items: Array<CategoryEntity>): Array<CarouselItemModel> {
    const result = [];
    for (const item of items) {
      result.push(new CarouselItemModel({
        title: item.name,
        imageUrl: item.image.src,
        routerUrl: '/ca'
      }));
    }
    return result;
  }

  public static productsToCarouselItem(items: Array<ProductEntity>): Array<CarouselItemModel> {
    const result = [];
    for (const item of items) {
      result.push(new CarouselItemModel({
        title: item.name,
        imageUrl: item.firstImage,
        routerUrl: '/ca'
      }));
    }
    return result;
  }
}
