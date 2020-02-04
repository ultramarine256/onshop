export class LoginResponse {
  public ok: boolean;
  public message: string;

  /// constructor
  constructor(init?: Partial<LoginResponse>) {
    Object.assign(this as any, init);
  }
}
