import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptorService } from './interceptor';
import { AuthGuard } from '@domain/services/auth/guards/auth.guard';
import { NoAuthGuard } from '@domain/services/auth/guards/no-auth.guard';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,

    /// app modules
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true,
    },
  ],
})
export class AuthModule {}
