export class RepositoryConfigurator {
  /// singleton
  private static _instance: RepositoryConfigurator;

  /// fields
  public apiBaseUrl: string;
  public token: string;

  /// constructor
  private constructor() {
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
