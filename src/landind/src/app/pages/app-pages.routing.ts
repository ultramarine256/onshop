import {AppPagesComponent} from './app-pages.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomePageComponent} from './home';

export const routes: Routes = [
  {
    path: '', component: AppPagesComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  }
];
export const AppPagesRouting: ModuleWithProviders = RouterModule.forChild(routes);
