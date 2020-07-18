export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public role: string;
  public username: string;
  public dateCreated: Date;
  public email: string;
  public phone: string;
  public avatar: string;
  public billing: Billing;
  public shipping: Shipping;

  constructor(props?: any) {
    if (props) {
      this.id = props.id;
      this.firstName = props.first_name;
      this.lastName = props.last_name;
      this.role = props.role;
      this.username = props.username;
      this.dateCreated = new Date(props.date_created);
      this.email = props.email;
      this.phone = props.phone;
      this.avatar = props.avatar_url;
      this.billing = new Billing(props.billing);
      this.shipping = new Shipping(props.shipping);
    }
  }

  public toJson() {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      role: this.role,
      username: this.username,
      date_created: this.dateCreated,
      email: this.email,
      phone: this.phone,
      avatar: this.avatar,
      billing: this.billing.getJson(),
      shipping: this.shipping.getJson(),
    };
  }
}

class Billing {
  public firstName: string;
  public lastName: string;
  public city: string;
  public state: string;
  public postcode: string;
  public email: string;
  public phone: string;

  constructor(props?: any) {
    if (props) {
      this.firstName = props.first_name;
      this.lastName = props.last_name;
      this.city = props.city;
      this.state = props.state;
      this.postcode = props.postcode;
      this.email = props.email;
      this.phone = props.phone;
    }
  }

  getJson() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      city: this.city,
      state: this.state,
      postcode: this.postcode,
      email: this.email,
      phone: this.phone,
    };
  }
}

class Shipping {
  public firstName: string;
  public lastName: string;
  public address: string;
  public city: string;
  public postcode: string;
  public state: string;

  constructor(props?: any) {
    if (props) {
      this.firstName = props.first_name;
      this.lastName = props.last_name;
      this.address = props.address_1;
      this.city = props.city;
      this.postcode = props.postcode;
      this.state = props.state;
    }
  }

  public getJson() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      address_1: this.address,
      city: this.city,
      postcode: this.postcode,
      state: this.state,
    };
  }
}
