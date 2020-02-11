import {CategoryImage} from './category.entity';

export class CheckoutEntity {
  requestedBy: string;
  projectName: string;
  projectNumber: string;

  address: string;
  city: string;
  state: string;
  zip: string;

  /// constructor
  constructor(init?: Partial<CheckoutEntity>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    // this.id = dto.id;
    // this.name = dto.name;
    // this.slug = dto.slug;
    // this.description = dto.status;
    // this.count = dto.count;
    // if (dto.image) {
    //   this.image.mapFromDto(dto.image);
    // }
  }
}
