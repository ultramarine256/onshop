import {FilterEntity} from '../filter.entity';

export class ProductFilter extends FilterEntity {
  /// fields
  perPage: number;

  /// constructor
  constructor(init?: Partial<ProductFilter>) {
    super();
    Object.assign(this as any, init);
  }
}
