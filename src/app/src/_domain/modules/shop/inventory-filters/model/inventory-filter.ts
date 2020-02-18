export class InventoryFilter {
  /// fields
  public categories: Array<FilterCategory>;
  public priceRange: PriceRange;

  /// constructor
  constructor(init?: Partial<InventoryFilter>) {
    this.categories = [];
    this.priceRange = new PriceRange();
    Object.assign(this as any, init);
  }
}

export class FilterCategory {
  /// fields
  public title: string;
  public attributes: Array<FilterAttribute>;

  /// constructor
  constructor(init?: Partial<FilterCategory>) {
    this.attributes = [];
    Object.assign(this as any, init);
  }
}

export class FilterAttribute {
  /// fields
  public name: string;
  public isChecked: boolean;
  public isDisabled: boolean;
  public count: number;

  /// constructor
  constructor(init?: Partial<FilterAttribute>) {
    Object.assign(this as any, init);
  }
}

export class PriceRange {
  /// fields
  public min: number;
  public max: number;
  public start: number;
  public end: number;

  /// constructor
  constructor(init?: Partial<PriceRange>) {
    Object.assign(this as any, init);
  }
}


