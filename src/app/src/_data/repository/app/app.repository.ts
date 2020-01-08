import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseRepository} from '../base.repository';
import {Observable} from 'rxjs';
import {ShopInfoEntity} from '../../../_core';

@Injectable()
export class AppRepository extends BaseRepository {
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public locationStepData(id: number): Observable<ShopInfoEntity> {
    return this.httpClient
      .get<ShopInfoEntity>(`${this.apiBaseUrl}/wp-json/app/info`);
  }
}
