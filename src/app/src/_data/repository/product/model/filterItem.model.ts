export class FilterItemModel {
  name: string;
  filter_items: Array<FilterItems>;
}

export class FilterItems {
  name: string;
  is_checked: string;
  count: number;
}
