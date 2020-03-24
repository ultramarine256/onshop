export class UserEntity {
  id: number;
  email: string;

  constructor(init?: Partial<UserEntity>) {
    Object.assign(this as any, init);
  }

  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.email = dto.email;
  }
}
