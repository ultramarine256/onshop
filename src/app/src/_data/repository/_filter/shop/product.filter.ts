import {FilterEntity} from '../filter.entity';

export class ProductFilter extends FilterEntity {
  /// fields
  category: number;
  perPage: number;

  /// constructor
  constructor(init?: Partial<ProductFilter>) {
    super();
    Object.assign(this as any, init);
  }
}
