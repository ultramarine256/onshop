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

  // constructor
  constructor(init?: Partial<UserModel>) {
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
  }
}
