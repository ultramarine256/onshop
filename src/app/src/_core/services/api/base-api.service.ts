import {environment} from '../../../environments/environment';

export abstract class BaseApiService {
  protected apiBaseUrl: string;
  protected analyticsApiBaseUrl: string;

  protected constructor() {
    this.apiBaseUrl = `${environment.apiUrl}`;
    // this.analyticsApiBaseUrl = `${environment.analyticsApiUrl}`;
  }
}
