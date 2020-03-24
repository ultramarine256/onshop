import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsModule} from '../../_domain';
import {HomePageComponent} from './home';
import {AppPagesComponent} from './app-pages.component';
import {AppPagesRouting} from './app-pages.routing';
import {ProjectDetailPageComponent, ProjectPageComponent} from './project';

@NgModule({
  declarations: [
    AppPagesComponent,
    HomePageComponent,
    ProjectPageComponent,
    ProjectDetailPageComponent
  ],
  imports: [
    CommonModule,

    ProjectsModule,

    // app-routing
    AppPagesRouting
  ],
  exports: [HomePageComponent, AppPagesComponent],
  providers: []
})
export class AppPagesModule {
}

