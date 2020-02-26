import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptorService} from './interceptor';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,

    /// app modules
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true
    }
  ]
})
export class AuthModule {
}
