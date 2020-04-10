export class FilterItemModel {
  name?: string;
  filter_items?: Array<FilterItems>;
  min?: number;
  max?: number;
}

export class FilterItems {
  name: string;
  is_checked: string;
  count: number;
}
