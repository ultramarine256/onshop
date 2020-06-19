import {RouterModule, Routes} from '@angular/router';
import {AppPagesComponent} from './app-pages.component';
import {ModuleWithProviders} from '@angular/core';
import {ProjectPageComponent} from './project';

export const routes: Routes = [
  {
    path: '', component: AppPagesComponent,
    children: [
      {
        path: '',
        component: ProjectPageComponent
      }
    ]
  }];
export const AppPagesRouting: ModuleWithProviders = RouterModule.forChild(routes);
