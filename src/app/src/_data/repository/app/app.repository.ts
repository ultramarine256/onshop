import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {AppInfoModel} from './model';
import {Observable, of} from 'rxjs';

@Injectable()
export class AppRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  // public appInfo(): Observable<ShopInfoEntity> {
  //   return this.httpClient
  //     .get<ShopInfoEntity>(`${this.apiBaseUrl}/wp-json/app/info`)
  //     .pipe(map(x => {
  //       const result = new ShopInfoEntity();
  //       result.mapFromDto(x);
  //       return result;
  //     }));
  // }

  public appInfo(): Observable<AppInfoModel> {
    const shopInfoEntity = new AppInfoModel({
      appTitle: 'OnShop',
      themeColor: '#007bff',
      logoImageUrl: 'https://onshopprod.blob.core.windows.net/blue-shop/assets/blue-shop-logo.svg',
      email: 'asd@mail.com',
      address: '123',
      phone: '(044) 333 22 11'
    });
    return of(shopInfoEntity);
  }
}
