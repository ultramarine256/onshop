import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserToken } from '@domain/auth/entities/user-token';
import { LoginResponse } from '@domain/auth/dtos/login.response';
import { IdentityResponse } from '@domain/auth/dtos/identity.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /// fields
  private _token: UserToken = new UserToken();
  private _identity: IdentityResponse = new IdentityResponse();

  /// properties
  get isAuthorized(): boolean {
    return !!this._identity.username;
  }

  get identity(): IdentityResponse {
    return this._identity;
  }

  /// constructor
  constructor(private httpClient: HttpClient) {
    const tokenJson = localStorage.getItem(AuthConstants.UserToken);
    if (tokenJson) {
      this._token.mapFromJson(JSON.parse(tokenJson));
    }

    const identityJson = localStorage.getItem(AuthConstants.UserIdentity);
    if (identityJson) {
      this._identity.mapFromJson(JSON.parse(identityJson));
    }
  }

  /// methods
  public login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiBaseUrl}/wp-json/onshop/v3/user/login`, { username, password })
      .pipe(map((x) => new LoginResponse({ jwt: x.jwt })));
  }

  public getUserIdentityInfo(token: string): Observable<IdentityResponse> {
    return this.httpClient
      .get<IdentityResponse>(`${environment.apiBaseUrl}/wp-json/onshop/v3/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((x) => {
          const a = new IdentityResponse();
          a.mapFromResponse(x);
          return a;
        })
      );
  }

  public logout() {
    this._token = new UserToken();
    this._identity = new IdentityResponse();
    localStorage.removeItem(AuthConstants.UserToken);
    localStorage.removeItem(AuthConstants.UserIdentity);
  }

  public setIdentity(identity: IdentityResponse) {
    this._identity = identity;
    localStorage.setItem(AuthConstants.UserIdentity, JSON.stringify(identity));
  }

  public setToken(entity: UserToken) {
    this._token = entity;
    localStorage.setItem(AuthConstants.UserToken, JSON.stringify(entity));
  }
}

export enum AuthConstants {
  UserToken = 'onshop-token',
  UserIdentity = 'onshop-identity',
}
