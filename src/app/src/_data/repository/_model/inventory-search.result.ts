import {ProductEntity} from './product.entity';

export class InventorySearchResult {
  /// fields
  items: Array<ProductEntity>;
  totalCount: number;
  page: number;
  totalPages: number;

  /// constructor
  constructor(init?: Partial<InventorySearchResult>) {
    this.items = [];
    Object.assign(this as any, init);
  }
}
