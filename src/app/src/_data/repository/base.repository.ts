import {environment} from '../../environments/environment';

export abstract class BaseRepository {
  protected apiBaseUrl: string;
  protected analyticsApiBaseUrl: string;

  protected constructor() {
    this.apiBaseUrl = `${environment.apiBaseUrl}`;
    // this.analyticsApiBaseUrl = `${environment.analyticsApiUrl}`;
  }
}
