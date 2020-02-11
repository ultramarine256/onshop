export class InventoryFilter {
  /// fields
  public scopes: Array<FilterScope>;

  /// constructor
  constructor(init?: Partial<InventoryFilter>) {
    this.scopes = [];
    Object.assign(this as any, init);
  }
}

export class FilterScope {
  /// fields
  public title: string;
  public attributes: Array<FilterAttribute>;

  /// constructor
  constructor(init?: Partial<FilterScope>) {
    this.attributes = [];
    Object.assign(this as any, init);
  }
}

export class FilterAttribute {
  /// fields
  public name: string;
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

  /// constructor
  constructor(init?: Partial<PriceRange>) {
    Object.assign(this as any, init);
  }
}

export class InventoryFilter__Mocks {
  public static DefauiltFilter__Mock(): InventoryFilter {
    const result = new InventoryFilter({
      scopes: [
        new FilterScope({
          title: 'Scope 1',
          attributes: [
            new FilterAttribute({name: 'Attribute 1-1'}),
            new FilterAttribute({name: 'Attribute 1-2'}),
            new FilterAttribute({name: 'Attribute 1-3'}),
          ]
        }),
        new FilterScope({
          title: 'Scope 2',
          attributes: [
            new FilterAttribute({name: 'Attribute 2-1'}),
            new FilterAttribute({name: 'Attribute 2-2'}),
            new FilterAttribute({name: 'Attribute 2-3'}),
            new FilterAttribute({name: 'Attribute 2-4'})
          ]
        }),
        new FilterScope({
          title: 'Scope 3',
          attributes: [
            new FilterAttribute({name: 'Attribute 3-1'}),
            new FilterAttribute({name: 'Attribute 3-2'})
          ]
        }),
      ]
    });
    return result;
  }
}
