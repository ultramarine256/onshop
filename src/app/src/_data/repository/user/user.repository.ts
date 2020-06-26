import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BaseRepository } from '../base.repository';
import { UserModel } from './model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserRepository extends BaseRepository {
  private userSubject$ = new ReplaySubject<UserModel>(1);
  public user$ = this.userSubject$.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getUser(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${environment.apiBaseUrl}/wp-json/onshop/v3/user`).pipe(
      map((userModel) => new UserModel(userModel)),
      tap((user) => this.userSubject$.next(user))
    );
  }
}
