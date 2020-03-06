import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {UserModel} from './model';

@Injectable()
export class UserRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getUser() {
    return this.httpClient.get<UserModel>(`${environment.apiBaseUrl}/wp-json/onshop/v1/user`)
      .pipe(map(x => {
        const a = new UserModel();
        a.mapFromResponse(x);
        return a;
      }));
  }
}
