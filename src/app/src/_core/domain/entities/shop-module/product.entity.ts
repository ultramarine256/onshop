import {environment} from '../../../../environments/environment';

export class ProductEntity {
  id: number;
  name: string;
  slug: string;
  status: string;
  price: number;

  categories: Array<ProductCategory>;
  images: Array<ProductImage>;
  attributes: Array<ProductAttribute>;

  /// properties
  get firstImage() {
    return this.images.length > 0 ? this.images[0].src : null;
  }

  /// constructor
  constructor() {
    this.categories = [];
    this.images = [];
    this.attributes = [];
  }

  /// mappers
  mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.slug = dto.slug;
    this.status = dto.status;
    this.price = dto.price;

    for (const img of dto.images) {
      const productImage = new ProductImage();
      productImage.mapFromDto(img);
      this.images.push(productImage);
    }

    for (const categoryDto of dto.categories) {
      const productCategory = new ProductCategory();
      productCategory.mapFromDto(categoryDto);
      this.categories.push(productCategory);
    }

    for (const attributeDto of dto.attributes) {
      const productAttribute = new ProductAttribute();
      productAttribute.mapFromDto(attributeDto);
      this.attributes.push(productAttribute);
    }
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

export class ProductCategory {
  id: number;
  name: string;
  slug: string;

  /// mappers
  mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.slug = dto.slug;
  }
}

export class ProductImage {
  id: number;
  name: string;
  src: string;

  /// mappers
  mapFromDto(dto: any) {
    if (!dto) {
      return null;
    }
    this.id = dto.id;
    this.name = dto.name;
    if (dto.src.indexOf('windows') >= 0) {
      this.src = dto.src;
    } else {
      this.src = `${environment.apiBaseUrl}/${dto.src}`;
    }
  }
}

export class ProductAttribute {
  id: number;
  name: string;
  options: Array<string>;

  /// constructor
  constructor() {
    this.options = [];
  }

  /// mappers
  mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.options = dto.options;
  }
}
