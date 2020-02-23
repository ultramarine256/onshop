import {DateExtensions, ObjectExtensions} from '../../../../_core';

export class OrderCreateModel {
  /// fields
  public paymentMethod: string;
  public paymentMethodTitle: string;
  public setPaid: boolean;
  public billing: Billing;
  public shipping: Shipping;
  public products: Array<LineItem>;

  public deliveryDate: Date;
  public projectName: string;
  public projectNumber: string;

  /// constructor
  constructor(init?: Partial<OrderCreateModel>) {
    this.deliveryDate = new Date();
    this.billing = new Billing();
    this.shipping = new Shipping();
    this.products = [];
    Object.assign(this as any, init);
  }

  /// mappers
  public mapToWooCommerceOrder(): {} {
    const json: { [k: string]: any } = {};

    json.payment_method = this.paymentMethod;
    json.payment_method_title = this.paymentMethodTitle;
    json.set_paid = this.setPaid;

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
        key: CUSTOM_FIELDS.DELIVERY_DATE_KEY,
        value: DateExtensions.monthDayYear(this.deliveryDate)
      });
    }

    if (this.projectName) {
      json.meta_data.push({
        key: CUSTOM_FIELDS.PROJECT_NAME_KEY,
        value: this.projectName
      });
    }

    if (this.projectNumber) {
      json.meta_data.push({
        key: CUSTOM_FIELDS.PROJECT_NUMBER_KEY,
        value: this.projectNumber
      });
    }

    ObjectExtensions.clean(json);

    return json;
  }
}

export class Billing {
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
  /// fields
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
  /// fields
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

export const PAYMENT = {
  payment_method__bacs: 'bacs',
  payment_title__direct: 'Direct Bank Transfer'
};

export const SHIPPING = {
  country: 'US'
};

export const CUSTOM_FIELDS = {
  DELIVERY_DATE_KEY: 'delivery-date',
  PROJECT_NAME_KEY: 'project-name',
  PROJECT_NUMBER_KEY: 'project-number',

  TALE_ON_RENT_KEY: 'take-on-rent',
  RENT_DURATION_KEY: 'rent-duration'
};

export const RENTAL_OPTIONS = {
  USE_RENT: 'yes'
};
