export class ShopInfoEntity {
  contactEmail: string;
  address: string;
  phone1: string

  constructor() {
  }

  /// mappers
  mapFromDto(dto: any) {
    this.contactEmail = dto['opt-email'];
    this.address = dto['opt-address'];
    this.phone1 = dto['opt-phone-1'];
  }
}
