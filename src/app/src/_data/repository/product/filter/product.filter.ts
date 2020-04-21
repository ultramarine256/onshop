import {FilterEntity} from '../../_abstraction';
import array from 'devextreme/ui/file_manager/file_provider/array';

export class ProductFilter extends FilterEntity {
  /// fields
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


  /// constructor
  constructor(init?: Partial<ProductFilter>) {
    super();
    this.stock_status = STOCK_STATUS.INSTOCK;
    this.status = INVENTORY_STATUS.PUBLISH;
    Object.assign(this as any, init);
  }
}

export const STOCK_STATUS = {
  INSTOCK: 'instock',
  OUTOFSTOCK: 'outofstock',
  ONBACKORDER: 'onbackorder'
};

export const INVENTORY_STATUS = {
  ANY: 'any',
  draft: 'draft',
  pending: 'pending',
  private: 'private',
  PUBLISH: 'publish'
};
