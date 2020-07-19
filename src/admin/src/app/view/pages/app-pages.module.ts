import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home';
import { AppPagesComponent } from './app-pages.component';
import { AppPagesRouting } from './app-pages.routing';
import { ProjectPageComponent } from './project';
import { ProjectsModule } from '../../domain';
import { ThemeModule } from '../../core';

@NgModule({
  declarations: [AppPagesComponent, HomePageComponent, ProjectPageComponent],
  imports: [
    /// angular
    CommonModule,
    ProjectsModule,

    /// core
    ThemeModule,

    /// routing
    AppPagesRouting,
  ],
  exports: [HomePageComponent, AppPagesComponent],
  providers: [],
})
export class AppPagesModule {}
