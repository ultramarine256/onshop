export class OrderEntity {

  paymentMethod: string;
  paymentMethodTitle: string;
  setPaid: boolean;

  billing: Billing;
  shipping: Shipping;
  lineItems: Array<LineItem>;

  constructor() {
    this.billing = new Billing();
    this.shipping = new Shipping();
    this.lineItems = [];
  }

  public asWooObject(): {} {
    const json = {
      payment_method: this.paymentMethod,
      payment_method_title: this.paymentMethodTitle,
      set_paid: this.setPaid,
      billing: this.billing,
      shipping: this.shipping,
      line_items: []
    };
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

  public asWooObject(): {} {
    return {};
  }
}

export class Shipping {
  fistName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;

  public asWooObject(): {} {
    return {};
  }
}

export class LineItem {
  productId: number;
  quantity: number;
}
