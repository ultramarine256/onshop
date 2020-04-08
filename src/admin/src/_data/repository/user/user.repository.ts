import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {AddUser, UserEntity} from './entity';

@Injectable()
export class UserRepository extends BaseRepository {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getAllUsers() {
    return this.httpClient.get<UserEntity[]>(`${this.apiBaseUrl}/wp-json/onshop/v1/users`, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  setProjectUsers(projectId: number, userId: number) {
    const user: AddUser = {
      user_ids: [userId]
    };
    return this.httpClient.post(`${this.apiBaseUrl}/wp-json/onshop/v1/project/` + projectId + '/users', user, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  public getProjectUsers(id: number) {
    return this.httpClient.get<AddUser>(`${this.apiBaseUrl}/wp-json/onshop/v1/project/` + id + '/users', {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  public deleteProjectUsers(id: number, project: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token
      }),
      body: {
        'user_ids': [id]
      },
    };
    return this.httpClient.delete(`${this.apiBaseUrl}/wp-json/onshop/v1/project/` + project + '/users', options);
  }
}
