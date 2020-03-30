import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {AddUser, UserEntity} from './entity';

@Injectable()
export class UserRepository extends BaseRepository {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getUsers(): Observable<any> {
    const items = [
      new UserEntity({
        id: 1,
        name: 'admin',
        lastName: 'customeroff2',
        email: 'ultramarine256@gmail.com',
      }),
      new UserEntity({
        id: 5,
        name: 'manager',
        lastName: 'manager',
        email: 'manager@mail.com',
      }),
      new UserEntity({
        id: 6,
        name: 'custumer6',
        lastName: 'customeroff6',
        email: 'customer@mail.com',
      }),
      new UserEntity({
        id: 15,
        name: 'custumer1',
        lastName: 'customeroff1',
        email: 'customer1@wp.com',
      }),
      new UserEntity({
        id: 16,
        name: 'angular',
        lastName: 'angular',
        email: 'angular@ukr.net',
      })
    ];
    const b = from(items);
    return b;
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
    return this.httpClient.get(`${this.apiBaseUrl}/wp-json/onshop/v1/project/` + id + '/users', {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
