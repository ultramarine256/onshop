import {RouterModule, Routes} from '@angular/router';
import {AppPagesComponent} from './app-pages.component';
import {ModuleWithProviders} from '@angular/core';
import {ProjectDetailPageComponent} from './project/project-details-page';
import {ProjectPageComponent} from './project';

export const routes: Routes = [
  {
    path: '', component: AppPagesComponent,
    children: [
      {
        path: '',
        component: ProjectPageComponent
      },
      {
        path: 'project/:id',
        component: ProjectDetailPageComponent
      },
    ]
  }];
export const AppPagesRouting: ModuleWithProviders = RouterModule.forChild(routes);
