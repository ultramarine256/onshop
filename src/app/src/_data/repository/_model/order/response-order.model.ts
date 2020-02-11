export class ResponseOrderModel {
  /// fields
  id: number;
  orderKey: string;

  /// constructor
  constructor(init?: Partial<ResponseOrderModel>) {
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromWooDto(dto: any) {
    this.id = dto.id;
    this.orderKey = dto.order_key;
  }
}
