export class ProfileModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public role: string;
  public username: string;
  public dateCreated: Date;

  /// constructor
  constructor(init?: Partial<ProfileModel>) {
    Object.assign(this as any, init);
  }

  mapFromResponse(dto: any) {
    this.id = dto.id;
    this.firstName = dto.first_name;
    this.lastName = dto.last_name;
    this.role = dto.role;
    this.username = dto.username;
    this.dateCreated = new Date(dto.date_created);
  }
}
