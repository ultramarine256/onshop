import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './home';
import {AppPagesRouting} from './app-pages.routing';
import {AppPagesComponent} from './app-pages.component';
import {ThemeModule} from '../../_domain';

@NgModule({
  declarations: [
    AppPagesComponent,
    HomePageComponent,
  ],
  imports: [
    /// angular
    CommonModule,
    RouterModule,

    /// domain
    ThemeModule,

    /// routing
    AppPagesRouting
  ],
  exports: [],
  providers: []
})
export class AppPagesModule {
}
