export class ShopInfoEntity {
  email: string;
  address: string;
  phone: string;

  /// constructor
  constructor(init?: Partial<ShopInfoEntity>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    this.email = dto['opt-email'];
    this.address = dto['opt-address'];
    this.phone = dto['opt-phone-1'];
  }
}
