export class RepositoryConfigurator {
  private static _instance: RepositoryConfigurator;

  public apiBaseUrl: string;
  public token: string;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
