import {RepositoryConfigurator} from './repository.configurator';

export abstract class BaseRepository {
  /// fields
  protected apiBaseUrl: string;

  /// constructor
  protected constructor() {
    const config = RepositoryConfigurator.Instance;
    this.apiBaseUrl = config.apiBaseUrl;
  }
}
