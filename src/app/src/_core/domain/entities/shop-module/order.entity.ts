export class OrderEntity {

  paymentMethod: string;
  paymentMethodTitle: string;
  setPaid: boolean;

  billing: Billing;
  shipping: Shipping;
  lineItems: Array<LineItem>;

  /// constructor
  constructor() {
    this.billing = new Billing();
    this.shipping = new Shipping();
    this.lineItems = [];
  }

  /// mappers
  public asWooObject(): {} {
    const json = {
      payment_method: this.paymentMethod,
      payment_method_title: this.paymentMethodTitle,
      set_paid: this.setPaid,
      billing: this.billing,
      shipping: this.shipping,
      line_items: this.lineItems
    };

    // for (const item of this.lineItems) {
    //   json.line_items.push({
    //     productId: 1,
    //     quantity: 1
    //   });
    // }

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
