import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseRepository } from '../base.repository';
import { UserModel } from './model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getUser() {
    return this.httpClient
      .get<UserModel>(`${environment.apiBaseUrl}/wp-json/onshop/v3/user`)
      .pipe(map((userModel) => new UserModel(userModel)));
  }

  public editUser(userData) {
    return this.httpClient.post<UserModel>(
      `${environment.apiBaseUrl}/wp-json/onshop/v3/user?first_name=${userData.firstName}`,
      userData
    );
  }
}
