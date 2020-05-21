import { FilterEntity } from '../../_abstraction';

export class ProductFilter extends FilterEntity {
  slug: string;
  search: string;
  include: string; // array of ints
  category: number;
  page: number;
  per_page: number;
  order: string;
  orderby: string;
  min_price: number;
  max_price: number;
  stock_status: string;
  status: string;
  on_sale: boolean;
  attribute: string;
  attribute_term: string;
  tag: string;

  constructor(init?: Partial<ProductFilter>) {
    super();
    this.stock_status = StockStatus.Instock;
    this.status = InventoryStatus.Publish;
    Object.assign(this as any, init);
  }
}

export enum StockStatus {
  Instock = 'instock',
  OutOfStock = 'outofstock',
  OnBackOrder = 'onbackorder',
}

export enum InventoryStatus {
  Any = 'any',
  Draft = 'draft',
  Pending = 'pending',
  Private = 'private',
  Publish = 'publish',
}
