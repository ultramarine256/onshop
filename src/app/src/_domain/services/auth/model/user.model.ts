export class UserModel {
  /// fields
  firstName: string;
  lastName: string;
  role: string;
  username: string;

  /// constructor
  constructor(init?: Partial<UserModel>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    this.firstName = dto.first_name;
    this.lastName = dto.last_name;
    this.role = dto.role;
    this.username = dto.username;
  }

  mapFromJson(dto: any) {
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.role = dto.role;
    this.username = dto.username;
  }
}
