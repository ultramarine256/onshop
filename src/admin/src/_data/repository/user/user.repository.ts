import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {UserEntity} from './entity';

@Injectable()
export class UserRepository extends BaseRepository {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getUsers(): Observable<any> {
    const items = [
      new UserEntity({
        id: 6,
        email: 'customer@mail.com',
      }),
      new UserEntity({
        id: 16,
        email: 'customer@mail.com',
      })
    ];
    const b = from(items);
    return b;
  }
}
