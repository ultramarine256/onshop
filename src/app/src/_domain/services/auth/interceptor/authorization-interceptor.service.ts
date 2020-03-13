import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthConstants} from '../auth.service';
import {UserToken} from '../entities';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {
  }

  /// methods

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req.clone();

    if (
      req.url.includes('user/login') ||
      req.url.includes('user/register') ||
      req.headers.has('Authorization')) {
      // const headers = req.headers.delete('Skip-Prefix');
      // const directRequest = req.clone({headers});
      return next.handle(authReq);
    }

    const tokenJson = localStorage.getItem(AuthConstants.USER_TOKEN);
    const userToken = new UserToken();
    if (tokenJson) {
      userToken.mapFromJson(JSON.parse(tokenJson));
    }

    if (userToken.token) {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', `Bearer ${userToken.token}`);
      // headers = headers.append('Access-Control-Allow-Origin', '*');
      authReq = req.clone({headers});
    }

    return next.handle(authReq)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.router
            .navigate(['/login'])
            .then(() => {
              localStorage.removeItem(AuthConstants.USER_TOKEN);
              localStorage.removeItem(AuthConstants.USER_IDENTITY);
            });
        }
        //
        // if (err.error instanceof Error) {
        //   // A client-side or network error occurred. Handle it accordingly.
        //   console.error('An error occurred:', err.error.message);
        // } else {
        //   // The backend returned an unsuccessful response code.
        //   // The response body may contain clues as to what went wrong,
        //   console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        // }
        return new Observable<HttpEvent<any>>();
      }));
  }
}
