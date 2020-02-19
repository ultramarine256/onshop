import {environment} from '../../../environments/environment';

export class ProductEntity {
  /// fields
  id: number;
  name: string;
  slug: string;
  status: string;
  price: number;

  description: string;
  shortDescription: string;

  backorders: string;
  stockQuantity: string;
  stockStatus: string;

  weight: string;
  dimensions: ProductDimensions;

  rentPerDayPrice: number;
  rentPerWeekPrice: number;
  rentPerMonthPrice: number;

  relatedIds: Array<number>;
  categories: Array<ProductCategory>;
  images: Array<ProductImage>;
  attributes: Array<ProductAttribute>;

  /// properties
  get firstImage(): string {
    return this.images.length > 0 ? this.images[0].src : null;
  }

  get firstCategory(): ProductCategory {
    return this.categories.length > 0 ? this.categories[0] : null;
  }

  get isRentable(): boolean {
    return !!this.rentPerDayPrice || !!this.rentPerWeekPrice || !!this.rentPerMonthPrice;
  }

  /// constructor
  constructor(init?: Partial<ProductEntity>) {
    this.relatedIds = [];
    this.dimensions = new ProductDimensions();
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

    this.description = dto.description;
    this.shortDescription = dto.short_description;

    this.backorders = dto.backorders;
    this.stockQuantity = dto.stock_quantity;
    this.stockStatus = dto.stock_status;

    this.weight = dto.weight;
    this.dimensions.mapFromDto(dto.dimensions);

    this.relatedIds = dto.related_ids;

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

    for (const attribute of this.attributes) {
      if (attribute.options.length > 0) {
        if (attribute.name === PRODUCT_ATTRIBUTE_NAMES.RENT_PRICE_DAY) {
          this.rentPerDayPrice = Number(attribute.options[0]);
        }
        if (attribute.name === PRODUCT_ATTRIBUTE_NAMES.RENT_PRICE_WEEK) {
          this.rentPerWeekPrice = Number(attribute.options[0]);
        }
        if (attribute.name === PRODUCT_ATTRIBUTE_NAMES.RENT_PRICE_MONTH) {
          this.rentPerMonthPrice = Number(attribute.options[0]);
        }
      }
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

export class ProductDimensions {
  /// fields
  length: string;
  width: string;
  height: string;

  /// constructor
  constructor(init?: Partial<ProductDimensions>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    this.length = dto.length;
    this.width = dto.width;
    this.height = dto.height;
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

export const PRODUCT_ATTRIBUTE_NAMES = {
  RENT_PRICE_DAY: 'rent__per-day',
  RENT_PRICE_WEEK: 'rent__per-week',
  RENT_PRICE_MONTH: 'rent__per-month'
};
