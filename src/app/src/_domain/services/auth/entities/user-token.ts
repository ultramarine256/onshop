export class UserToken {
  public token: string;

  /// constructor
  constructor(init?: Partial<UserToken>) {
    Object.assign(this as any, init);
  }

  mapFromJson(json: any) {
    this.token = json.token;
  }
}
