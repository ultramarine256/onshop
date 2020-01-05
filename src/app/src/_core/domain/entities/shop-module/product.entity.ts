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
  static mapFromMany(dtos: Array<any>): Array<ProductEntity> {
    const result = [];
    for (const dto of dtos) {
      const entity = new ProductEntity();
      entity.mapFromDto(dto);
      result.push(entity);
    }
    return result;
  }

  mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.slug = dto.slug;
    this.status = dto.status;
    this.price = dto.price;
  }
}

export class ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export class ProductImage {
  id: number;
  name: string;
  src: string;
}


export class ProductAttribute {
  id: number;
  name: string;
  options: Array<string>;
}
