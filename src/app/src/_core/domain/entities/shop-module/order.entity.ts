import {ObjectExtensions} from '../../../extensions';

export class OrderEntity {
  paymentMethod: string;
  paymentMethodTitle: string;
  setPaid: boolean;

  billing: Billing;
  shipping: Shipping;
  lineItems: Array<LineItem>;

  /// constructor
  constructor(init?: Partial<OrderEntity>) {
    this.billing = new Billing();
    this.shipping = new Shipping();
    this.lineItems = [];
    Object.assign(this as any, init);
  }

  /// mappers
  public asWooObject(): {} {
    const json: {[k: string]: any} = {};

    json.payment_method = this.paymentMethod;
    json.payment_method_title = this.paymentMethodTitle;
    json.set_paid = this.setPaid;

    if (this.billing && this.billing.fistName) {
      json.billing = this.billing.asWooObject();
    }

    if (this.shipping && this.shipping.fistName) {
      json.billing = this.shipping.asWooObject();
    }

    json.line_items = [];
    for (const item of this.lineItems) {
      json.line_items.push(item.asWooObject());
    }

    ObjectExtensions.clean(json);

    return json;
  }
}

export class Billing {
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
  constructor(init?: Partial<Billing>) {
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
      phone: this.phone
    };
  }
}

export class Shipping {
  fistName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;

  /// constructor
  constructor(init?: Partial<Billing>) {
    Object.assign(this as any, init);
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
      country: this.country
    };
  }
}

export class LineItem {
  productId: number;
  quantity: number;

  /// constructor
  constructor(init?: Partial<LineItem>) {
    Object.assign(this as any, init);
  }

  /// mappers
  public asWooObject(): {} {
    return {
      product_id: this.productId,
      quantity: this.quantity
    };
  }
}

export const PAYMENT_METHOD = {
  BACS: 'bacs'
};
