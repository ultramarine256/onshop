import { FilterEntity } from '../../_abstraction';

export class CategoryFilter extends FilterEntity {
  id: number;
  slug: string;

  constructor(init?: Partial<CategoryFilter>) {
    super();
    Object.assign(this as any, init);
  }
}
