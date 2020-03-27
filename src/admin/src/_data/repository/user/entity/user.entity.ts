export class UserEntity {
  id: number;
  name: string;
  lastName: string;
  email: string;

  constructor(init?: Partial<UserEntity>) {
    Object.assign(this as any, init);
  }

  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.lastName = dto.lastName;
    this.email = dto.email;
  }
}

export class AddUser {
  user_ids: Array<number>;
}
