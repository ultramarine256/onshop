export class UserEntity {
  id: number;
  first_name: string;
  last_name: string;
  email: string;

  constructor(init?: Partial<UserEntity>) {
    Object.assign(this as any, init);
  }

  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.first_name = dto.first_name;
    this.last_name = dto.last_name;
    this.email = dto.email;
  }
}

export class AddUser {
  user_ids: Array<number>;
  // constructor(init?: Partial<UserEntity>) {
  //   Object.assign(this as any, init);
  // }
  // public mapFromDto(dto: any) {
  //   this.user_ids = dto.user_ids;
  // }
}
