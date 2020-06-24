import { CustomOrderFields } from '../enum/custom-order-fields.enum';
import { ObjectExtensions } from '@domain/extensions/object.extensions';
import { DateExtensions } from '@domain/extensions/date.extensions';

export class OrderCreateModel {
  /// fields
  public customerId: number;
  public paymentMethod: string;
  public paymentMethodTitle: string;
  public setPaid: boolean;
  public billing: BillingModel;
  public shipping: ShippingModel;
  public products: LineItemModel[];
  public deliveryDate: Date;
  public deliveryInstructions: string;
  public deliveryTime: number;
  public projectName: string;
  public projectNumber: string;
  public discountTotal: number;
  public status: OrderStatus;

  /// constructor
  constructor(init?: Partial<OrderCreateModel>) {
    this.deliveryDate = new Date();
    this.billing = new BillingModel();
    this.shipping = new ShippingModel();
    this.products = [];

    Object.assign(this as any, init);
  }

  /// mappers
  public mapToWooCommerceOrder(): {} {
    const json: { [k: string]: any } = {};

    json.customer_id = this.customerId;

    json.payment_method = this.paymentMethod;
    json.payment_method_title = this.paymentMethodTitle;
    json.set_paid = this.setPaid;
    json.discount_total = this.discountTotal;
    json.status = this.status;

    if (this.billing && this.billing.phone) {
      json.billing = this.billing.asWooObject();
    }

    if (this.shipping && this.shipping.fistName) {
      json.shipping = this.shipping.asWooObject();
    }

    json.line_items = [];
    for (const item of this.products) {
      json.line_items.push(item.asWooObject());
    }

    json.meta_data = [];
    if (this.deliveryDate) {
      json.meta_data.push({
        key: CustomOrderFields.DeliveryDate,
        value: DateExtensions.monthDayYear(this.deliveryDate),
      });
    }

    if (this.deliveryInstructions) {
      json.meta_data.push({
        key: CustomOrderFields.DeliveryInstructions,
        value: this.deliveryInstructions,
      });
    }

    if (this.deliveryTime) {
      json.meta_data.push({
        key: CustomOrderFields.DeliveryTime,
        value: this.deliveryTime,
      });
    }

    if (this.projectName) {
      json.meta_data.push({
        key: CustomOrderFields.ProjectName,
        value: this.projectName,
      });
    }

    if (this.projectNumber) {
      json.meta_data.push({
        key: CustomOrderFields.ProjectNumber,
        value: this.projectNumber,
      });
    }

    if (this.products.some((product) => product.rentalInfo)) {
      json.meta_data.push({
        key: CustomOrderFields.RentalInfo,
        value: this.products
          .filter((product) => product.rentalInfo)
          .map(
            (product) =>
              `${product.title} for ${product.rentalInfo.duration} from ${new Date(
                product.rentalInfo.dateFrom
              ).toLocaleDateString()} to ${new Date(product.rentalInfo.dateTo).toLocaleDateString()}`
          )
          .join('; '),
      });
    }

    ObjectExtensions.clean(json);

    return json;
  }
}

export class BillingModel {
  /// fields
  fistName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;

  /// constructor
  constructor(init?: Partial<BillingModel>) {
    Object.assign(this as any, init);
  }

  /// mappers
  public asWooObject(): {} {
    return {
      first_name: this.fistName,
      last_name: this.lastName,
      address_1: this.address1,
      address_2: this.address2,
      city: this.city,
      state: this.state,
      postcode: this.postcode,
      country: this.country,
      email: this.email,
      phone: this.phone,
    };
  }
}

export class ShippingModel {
  /// fields
  fistName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;

  /// constructor
  constructor(init?: Partial<BillingModel>) {
    Object.assign(this as any, init);
  }

  public mapFromDto(dto: any) {
    this.fistName = dto.first_name;
    this.lastName = dto.last_name;
    this.address1 = dto.address_1;
    this.city = dto.city;
    this.state = dto.state;
    this.postcode = dto.postcode;
    this.country = dto.country;
  }

  /// mappers
  public asWooObject(): {} {
    return {
      first_name: this.fistName,
      last_name: this.lastName,
      address_1: this.address1,
      city: this.city,
      state: this.state,
      postcode: this.postcode,
      country: this.country,
    };
  }
}

export class LineItemModel {
  /// fields
  productId: number;
  title: string;
  quantity: number;
  rentPrice: number;
  purchasePrice: number;
  rentalInfo: {
    duration: number;
    dateFrom: Date;
    dateTo: Date;
  };

  /// constructor
  constructor(init?: Partial<LineItemModel>) {
    Object.assign(this as any, init);
  }

  /// mappers
  public asWooObject(): {} {
    const result = {
      product_id: this.productId,
      title: this.title,
      quantity: this.quantity,
    };
    if (this.rentalInfo) {
      (result as any).meta_data = [
        {
          key: 'rental-duration',
          value: this.rentalInfo.duration,
        },
        {
          key: 'rent-price',
          value: this.rentPrice,
        },
        {
          key: 'rent-date-from',
          value: new Date(this.rentalInfo.dateFrom).toLocaleDateString(),
        },
        {
          key: 'rent-date-to',
          value: new Date(this.rentalInfo.dateTo).toLocaleDateString(),
        },
      ];
      (result as any).total = this.rentPrice;
    } else {
      (result as any).total = this.purchasePrice;
    }
    return result;
  }
}

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Waiting = 'waiting-return',
  InRent = 'in-rent',
  Completed = 'completed',
  Cancelled = 'cancelled',
}
