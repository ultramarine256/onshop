export class LoginResponse {
  public jwt: string;

  constructor(init?: Partial<LoginResponse>) {
    Object.assign(this as any, init);
  }
}
