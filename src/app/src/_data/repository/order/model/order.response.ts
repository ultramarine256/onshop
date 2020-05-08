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
  line_items:any;
  deliveryDate: Date;
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
    for (const item of dto.meta_data) {
      if (item.key === ORDER_METADATA_NAMES.DELIVERY_DATE) {
        this.deliveryDate = new Date(item.value);
      }
      if (item.key === ORDER_METADATA_NAMES.PROJECT_NUMBER) {
        this.projectNumber = item.value;
      }
    }
  }
}

export const ORDER_METADATA_NAMES = {
  DELIVERY_DATE: 'delivery-date',
  PROJECT_NUMBER: 'project-number',
};

class ProductItems {
  id: number;
  name: string;
  productId: string;
  price: number;
  duration: number;
}
