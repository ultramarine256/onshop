export class AppInfoModel {
  appTitle: string;
  themeColor: string;
  logoImageUrl: string;
  email: string;
  address: string;
  phone: string;
  promo1: string;
  promo2: string;
  deliveryFee: number;
  deliveryDuration: number;

  /// constructor
  constructor(init?: Partial<AppInfoModel>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    this.email = dto['opt-email'];
    this.address = dto['opt-address'];
    this.phone = dto['opt-phone-1'];
    this.promo1 = dto['opt-promo1'];
    this.promo2 = dto['opt-promo2'];
    this.deliveryFee = +dto['opt-delivery-fee'];
    this.deliveryDuration = +dto['opt-delivery-duration'];
  }
}
