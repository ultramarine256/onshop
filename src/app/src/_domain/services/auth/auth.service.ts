import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IdentityResponse, LoginResponse} from './dtos';
import {map} from 'rxjs/operators';
import {UserToken} from './entities';

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
    const tokenJson = localStorage.getItem(AuthConstants.USER_TOKEN);
    if (tokenJson) {
      this._token.mapFromJson(JSON.parse(tokenJson));
    }

    const identityJson = localStorage.getItem(AuthConstants.USER_IDENTITY);
    if (identityJson) {
      this._identity.mapFromJson(JSON.parse(identityJson));
    }
  }

  /// methods
  public login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiBaseUrl}/wp-json/onshop/v1/user/login`, {username, password})
      .pipe(map(x => new LoginResponse({jwt: x.jwt})));
  }

  public register(username: string, password: string, email: string): Observable<any> {
    return null;
  }

  public getUserIdentityInfo(token: string): Observable<IdentityResponse> {
    return this.httpClient.get<IdentityResponse>(`${environment.apiBaseUrl}/wp-json/onshop/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(map(x => {
      const a = new IdentityResponse();
      a.mapFromResponse(x);
      return a;
    }));
  }

  public logout() {
    this._token = new UserToken();
    this._identity = new IdentityResponse();
    localStorage.removeItem(AuthConstants.USER_TOKEN);
    localStorage.removeItem(AuthConstants.USER_IDENTITY);
  }

  public setIdentity(identity: IdentityResponse) {
    this._identity = identity;
    localStorage.setItem(AuthConstants.USER_IDENTITY, JSON.stringify(identity));
  }

  public setToken(entity: UserToken) {
    this._token = entity;
    localStorage.setItem(AuthConstants.USER_TOKEN, JSON.stringify(entity));
  }
}

export const AuthConstants = {
  USER_TOKEN: 'onshop-token',
  USER_IDENTITY: 'onshop-identity'
};
