import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home';
import {AppPagesRouting} from './app-pages.routing';
import {AppPagesComponent} from './app-pages.component';

@NgModule({
  declarations: [
    AppPagesComponent,
    HomePageComponent,
  ],
  imports: [
    /// angular modules
    CommonModule,

    /// app modules

    /// routing
    AppPagesRouting
  ],
  exports: [],
  providers: []
})
export class AppPagesModule {
}
