export class OrderCreateResponse {
  /// fields
  id: number;
  orderKey: string;

  /// constructor
  constructor(init?: Partial<OrderCreateResponse>) {
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromWooDto(dto: any) {
    this.id = dto.id;
    this.orderKey = dto.order_key;
  }
}
