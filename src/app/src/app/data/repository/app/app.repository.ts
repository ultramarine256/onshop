import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppInfoModel } from './model';
import { BaseRepository } from '../base.repository';

@Injectable({
  providedIn: 'root',
})
export class AppRepository extends BaseRepository {
  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public appInfo(): Observable<AppInfoModel> {
    return this.httpClient.get<AppInfoModel>(`${this.apiBaseUrl}/wp-json/app/info`).pipe(
      map((x) => {
        const result = new AppInfoModel();
        result.mapFromDto(x);
        return result;
      })
    );
  }
}
