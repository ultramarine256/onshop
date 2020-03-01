export class IdentityResponse {
  public id: number;
  public firstName: string;
  public lastName: string;
  public role: string;
  public username: string;
  public dateCreated: Date;

  /// constructor
  constructor(init?: Partial<IdentityResponse>) {
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

  mapFromJson(json: any) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.role = json.role;
    this.username = json.username;
    this.dateCreated = new Date(json.dateCreated);
  }
}
