import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AuthInterceptor, PwaService } from '../domain';
import { ThemeModule } from '../core';
import { environment } from '../../environments/environment';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [AppComponent],
  imports: [
    /// angular
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    /// core
    ThemeModule,

    /// routing
    AppRouting,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
