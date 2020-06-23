import { environment } from '../../environments/environment';

export class RepositoryConfigurator {
  /// singleton
  private static _instance: RepositoryConfigurator;

  /// fields
  public apiBaseUrl = environment.apiBaseUrl;

  /// constructor
  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
