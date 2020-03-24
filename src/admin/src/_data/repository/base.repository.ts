import {RepositoryConfigurator} from './repository.configurator';

export abstract class BaseRepository {
  /// fields
  protected apiBaseUrl: string;
  protected token: string;

  /// constructor
  protected constructor() {
    const config = RepositoryConfigurator.Instance;
    this.apiBaseUrl = config.apiBaseUrl;
    this.token = config.token;
  }
}
