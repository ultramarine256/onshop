import {ProductEntity} from './product.entity';

export class InventorySearchResult {
  /// fields
  items: Array<ProductEntity>;
  filters: SearchResultFilters;
  totalCount: number;
  page: number;
  totalPages: number;

  /// constructor
  constructor(init?: Partial<InventorySearchResult>) {
    this.items = [];
    this.filters = new SearchResultFilters();
    Object.assign(this as any, init);
  }
}

export class SearchResultFilters {
  /// fields
  categories: Array<CategoryFilterResponse>;
  price: PricingFilter;

  /// constructor
  constructor(init?: Partial<SearchResultFilters>) {
    this.categories = [];
    this.price = new PricingFilter();
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromDto(dto: any) {
  }
}

export class CategoryFilterResponse {
  categoryName: string;
  filterItems: Array<any>;

  /// constructor
  constructor(init?: Partial<CategoryFilterResponse>) {
    this.filterItems = [];
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromDto(dto: any) {
    this.categoryName = dto.categoryName;
    this.filterItems = [];
  }
}

export class PricingFilter {
  minPrice: string;
  maxPrice: string;

  /// constructor
  constructor(init?: Partial<PricingFilter>) {
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromDto(dto: any) {
    this.minPrice = dto.min_price;
    this.maxPrice = dto.max_price;
  }
}
