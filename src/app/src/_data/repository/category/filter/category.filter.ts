import {FilterEntity} from '../../_abstraction';

export class CategoryFilter extends FilterEntity {
  /// fields
  id: number;
  slug: string;

  /// constructor
  constructor(init?: Partial<CategoryFilter>) {
    super();
    Object.assign(this as any, init);
  }
}
