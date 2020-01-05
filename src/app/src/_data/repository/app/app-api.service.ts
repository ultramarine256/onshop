import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '../base-api.service';

@Injectable()
export class AppApiService extends BaseApiService {

  constructor(httpClient: HttpClient) {
    super();
  }
}
