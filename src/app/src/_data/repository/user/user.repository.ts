import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {ProfileModel} from './model';

@Injectable()
export class UserRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getProfile() {
    return this.httpClient.get<ProfileModel>(`${environment.apiBaseUrl}/wp-json/onshop/v1/user`)
      .pipe(map(x => {
        const a = new ProfileModel();
        a.mapFromResponse(x);
        return a;
      }));
  }
}
