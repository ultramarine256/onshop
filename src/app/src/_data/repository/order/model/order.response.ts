export class OrderResponse {
  /// fields
  id: number;
  orderKey: string;
  status: string;
  currency: string;
  dateCreated: Date;
  total: string;
  billing: any;
  shipping: any;

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
    this.billing = dto.billing;
    this.shipping = dto.shipping;
  }
}

// export class Billing {
//   firstName: string;
//   lastName: string;
//   company: string;
//   country: string;
//   email: string;
//   phone: string;
//   // constructor(init?: Partial<Billing>) {
//   //   Object.assign(this as any, init);
//   // }
//   // public mapFromDto(dto: any) {
//   //   this.firstName = dto.first_name;
//   //   this.lastName = dto. last_name;
//   //   this.company = dto.company;
//   //   this.country = dto.country;
//   //   this.email = dto.email;
//   //   this.phone = dto.phone;
//   // }
// }
