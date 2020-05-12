import { CustomOrderFields } from '../enum/custom-order-fields.enum';

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
  meta_data: any;
  line_items: any;
  deliveryDate: Date;
  deliveryInstructions: string;
  deliveryTime: string;
  projectNumber: string;
  productItems: any;

  /// constructor
  constructor(init?: Partial<OrderResponse>) {
    this.deliveryDate = new Date();
    this.dateCreated = new Date();
    this.productItems = [];
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
    this.productItems = dto.line_items;

    dto.meta_data.forEach((item) => {
      if (item.key === CustomOrderFields.DeliveryDate) {
        this.deliveryDate = new Date(item.value);
      }
      if (item.key === CustomOrderFields.DeliveryInstructions) {
        this.deliveryInstructions = item.value;
      }
      if (item.key === CustomOrderFields.DeliveryTime) {
        this.deliveryTime = item.value;
      }
      if (item.key === CustomOrderFields.ProjectNumber) {
        this.projectNumber = item.value;
      }
    });
  }
}
