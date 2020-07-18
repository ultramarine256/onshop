import { CustomOrderFields } from '../enum/custom-order-fields.enum';

import { BillingModel, ShippingModel } from '../model/order-create.model';

export class OrderResponse {
  /// fields
  id: number;
  orderKey: string;
  status: string;
  currency: string;
  dateCreated: Date;
  total: string;
  billing: BillingModel;
  shipping: ShippingModel;
  meta_data: any;
  line_items: any;
  deliveryDate: Date;
  deliveryInstructions: string;
  deliveryTime: string;
  projectNumber: string;
  productItems: ProductItem[];

  /// constructor
  constructor(init?: Partial<OrderResponse>) {
    this.deliveryDate = new Date();
    this.dateCreated = new Date();
    this.productItems = [];
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromDto(dto: any) {
    const shipping = new ShippingModel();
    shipping.mapFromDto(dto.shipping);

    const productItems = dto.line_items.map((lineItem) => {
      const productItem = new ProductItem();
      productItem.mapFromDto(lineItem);
      return productItem;
    });

    this.id = dto.id;
    this.orderKey = dto.order_key;
    this.status = dto.status;
    this.currency = dto.currency;
    this.dateCreated = new Date();
    this.total = dto.total;
    this.billing = dto.billing;
    this.shipping = shipping;
    this.productItems = productItems;

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

  // Get max days of rental duration for current order
  public get rentalDuration(): number {
    return Math.max(...this.productItems.map((productItem) => productItem.maxRentalDuration));
  }
}

export class ProductItem {
  id: number;
  metaData: any;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  sku: string;
  subtotal: string;
  subtotalTax: string;
  taxClass: string;
  taxes: any;
  length: number;
  total: string;
  totalTax: string;
  variationId: number;

  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.metaData = dto.meta_data;
    this.name = dto.name;
    this.price = dto.price;
    this.productId = dto.product_id;
    this.quantity = dto.quantity;
    this.sku = dto.sku;
    this.subtotal = dto.subtotal;
    this.subtotalTax = dto.subtotal_tax;
    this.taxClass = dto.tax_class;
    this.taxes = dto.taxes;
    this.length = dto.length;
    this.total = dto.total;
    this.totalTax = dto.total_tax;
    this.variationId = dto.variation_id;
  }

  public get hasRent(): boolean {
    return this.metaData.some((metaDataItem) => metaDataItem.key === 'rental-duration');
  }

  public get maxRentalDuration(): number {
    return Math.max(this.metaData.filter((item) => item.key === 'rental-duration').map((item) => +item.value));
  }

  public getPrice(): number {
    const rentMetaData = this.metaData.find((data) => data.key === 'rent-price');
    return rentMetaData ? +rentMetaData.value : +this.total;
  }

  public get daysForRent(): number {
    const rentMetaData = this.metaData.find((data) => data.key === 'rental-duration');
    return rentMetaData.value;
  }
}
