import { RepositoryConfigurator } from './repository.configurator';

export abstract class BaseRepository {
  protected apiBaseUrl: string;

  protected constructor() {
    const config = RepositoryConfigurator.Instance;
    this.apiBaseUrl = config.apiBaseUrl;
  }
}
