import {environment} from '../../../../environments/environment';

export class ProductEntity {
  /// fields
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
  constructor(init?: Partial<ProductEntity>) {
    this.categories = [];
    this.images = [];
    this.attributes = [];
    Object.assign(this as any, init);
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
}

export class ProductCategory {
  /// fields
  id: number;
  name: string;
  slug: string;

  /// constructor
  constructor(init?: Partial<ProductCategory>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.slug = dto.slug;
  }
}

export class ProductImage {
  /// fields
  id: number;
  name: string;
  src: string;

  /// constructor
  constructor(init?: Partial<ProductImage>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    if (!dto) {
      return null;
    }
    this.id = dto.id;
    this.name = dto.name;
    if (dto.src.indexOf('http') >= 0 || dto.src.indexOf('https') >= 0) {
      this.src = dto.src;
    } else {
      this.src = `${environment.apiBaseUrl}/${dto.src}`;
    }
  }
}

export class ProductAttribute {
  /// fields
  id: number;
  name: string;
  options: Array<string>;

  /// constructor
  constructor(init?: Partial<ProductAttribute>) {
    this.options = [];
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.options = dto.options;
  }
}
