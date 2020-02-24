import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginResponse, UserModel} from './model';
import {filter, finalize, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /// fields
  private _isAuthorized = false;
  private _identity: UserModel = new UserModel();

  /// properties
  get isAuthorized() {
    return this._isAuthorized;
  }

  get identity(): UserModel {
    return this._identity;
  }

  /// constructor
  constructor(private httpClient: HttpClient) {
    const isAuthorized = localStorage.getItem(Constants.IS_AUTHORIZED_KEY);
    if (isAuthorized) {
      this._isAuthorized = !!JSON.parse(isAuthorized);
    }

    const identity = localStorage.getItem(Constants.IDENTITY_KEY);
    if (identity) {
      const userModel = new UserModel();
      userModel.mapFromJson(JSON.parse(identity));
      this._identity = userModel;
    }
  }

  /// methods
  public regiser(username: string, password: string, email: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('email', email);
    return this.httpClient.post(`${environment.apiBaseUrl}/wp-json/onshop/v1/user/register`, body);
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    const emitter: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(null);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    const self = this;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const userModel = new UserModel();
          userModel.mapFromDto(JSON.parse(this.responseText));

          self.setAuthFlag(true);
          self.setIdentity(userModel);

          emitter.next(new LoginResponse({ok: true}));
        } else {
          emitter.next(new LoginResponse({ok: false, message: 'Login or password incorrect.'}));
        }
      }
    });

    xhr.open('POST', 'http://localhost:8202/wp-json/onshop/v1/user/login');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(`username=${username}&password=${password}`);

    return emitter.pipe(filter(x => x != null));
  }

  public logout(): Observable<any> {
    return this.httpClient
      .post(`${environment.apiBaseUrl}/wp-json/onshop/v1/user/logout`, null)
      .pipe(map(x => {
        return x.toString().toLowerCase() === 'ok';
      }))
      .pipe(finalize(() => {
        this.setAuthFlag(false);
        this.setIdentity(new UserModel());
      }));
  }

  /// helpers
  private setAuthFlag(isAuthorized: boolean) {
    this._isAuthorized = isAuthorized;
    localStorage.setItem(Constants.IS_AUTHORIZED_KEY, JSON.stringify(isAuthorized));
  }

  private setIdentity(identity: UserModel) {
    this._identity = identity;
    localStorage.setItem(Constants.IDENTITY_KEY, JSON.stringify(identity));
  }
}

const Constants = {
  IS_AUTHORIZED_KEY: 'onshop-is-authorized',
  IDENTITY_KEY: 'onshop-is-authorized'
};
