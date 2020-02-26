export class OrderResponse {
  /// fields
  id: number;
  orderKey: string;
  status: string;
  currency: string;
  dateCreated: Date;
  total: string;

  /// constructor
  constructor(init?: Partial<OrderResponse>) {
    this.dateCreated = new Date();
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.orderKey = dto.order_key;
    this.status = dto.status;
    this.currency = dto.currency;
    this.dateCreated = new Date();
    this.total = dto.total;
  }
}
