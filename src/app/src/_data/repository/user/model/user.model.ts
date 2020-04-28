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

    // constructor
    constructor(init?: Partial<UserModel>) {
        this.billing = new Billing();
        this.shipping = new Shipping();
        Object.assign(this as any, init);
    }

    mapFromResponse(dto: any) {
        this.id = dto.id;
        this.firstName = dto.first_name;
        this.lastName = dto.last_name;
        this.role = dto.role;
        this.username = dto.username;
        this.dateCreated = new Date(dto.date_created);
        this.email = dto.email;
        this.phone = dto.phone;
        this.avatar = dto.avatar_url;
        this.billing.mapFromResponse(dto.billing);
        this.shipping.mapFromResponse(dto.shipping);
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

    mapFromResponse(dto: any) {
        this.firstName = dto.first_name;
        this.lastName = dto.last_name;
        this.city = dto.city;
        this.state = dto.state;
        this.postcode = dto.postcode;
        this.email = dto.email;
        this.phone = dto.phone;
    }
}

class Shipping {
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    public postcode: string;

    mapFromResponse(dto: any) {
        this.firstName = dto.first_name;
        this.lastName = dto.last_name;
        this.address = dto.address_1;
        this.city = dto.city;
        this.postcode = dto.postcode;
    }
}
