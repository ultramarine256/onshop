import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {AppInfoModel} from './model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AppRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public appInfo(): Observable<AppInfoModel> {
    return this.httpClient
      .get<AppInfoModel>(`${this.apiBaseUrl}/wp-json/app/info`)
      .pipe(map(x => {
        const result = new AppInfoModel();
        result.mapFromDto(x);
        return result;
      }));
  }
}
