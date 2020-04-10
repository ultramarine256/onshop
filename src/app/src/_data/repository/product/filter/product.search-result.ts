import {ProductModel} from '../model';

export class ProductSearchResult {
  /// fields
  items: Array<ProductModel>;
  filters: SearchResultFilters;
  totalCount: number;
  page: number;
  totalPages: number;

  /// constructor
  constructor(init?: Partial<ProductSearchResult>) {
    this.items = [];
    this.filters = new SearchResultFilters();
    Object.assign(this as any, init);
  }
}

export class SearchResultFilters {
  /// fields
  filterItems: Array<FilterItem>;
  price: PricingFilter;

  /// constructor
  constructor(init?: Partial<SearchResultFilters>) {
    this.filterItems = [];
    this.price = new PricingFilter();
    Object.assign(this as any, init);
  }
}

export class FilterItem {
  name: string;
  items: Array<any>;

  constructor(init?: Partial<FilterItem>) {
    this.items = [];
    Object.assign(this as any, init);
  }

  public mapFromDto(dto: any) {
    this.name = dto.categoryName;
    this.items = [];
  }
}

export class PricingFilter {
  name: string;
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
