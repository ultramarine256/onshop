import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthConstants } from '../auth.service';
import { UserToken } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  /// methods

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req.clone();

    if (req.url.includes('user/login') || req.url.includes('user/register') || req.headers.has('Authorization')) {
      return next.handle(authReq);
    }

    const tokenJson = localStorage.getItem(AuthConstants.UserToken);
    const userToken = new UserToken();
    if (tokenJson) {
      userToken.mapFromJson(JSON.parse(tokenJson));
    }

    if (userToken.token) {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', `Bearer ${userToken.token}`);
      authReq = req.clone({ headers });
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/login']).then(() => {
            localStorage.removeItem(AuthConstants.UserToken);
            localStorage.removeItem(AuthConstants.UserIdentity);
          });
        }
        return new Observable<HttpEvent<any>>();
      })
    );
  }
}
