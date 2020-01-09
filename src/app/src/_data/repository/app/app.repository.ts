import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseRepository} from '../base.repository';
import {Observable} from 'rxjs';
import {ShopInfoEntity} from '../../../_core';
import {map} from 'rxjs/operators';

@Injectable()
export class AppRepository extends BaseRepository {
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getShopInfo(): Observable<ShopInfoEntity> {
    return this.httpClient
      .get<ShopInfoEntity>(`${this.apiBaseUrl}/wp-json/app/info`)
      .pipe(map((x: any) => {
        const result = new ShopInfoEntity();
        result.mapFromDto(x);
        return result;
      }));
  }
}
