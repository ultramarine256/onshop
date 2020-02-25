export class LoginResponse {
  public jwt: string;

  /// constructor
  constructor(init?: Partial<LoginResponse>) {
    Object.assign(this as any, init);
  }
}
