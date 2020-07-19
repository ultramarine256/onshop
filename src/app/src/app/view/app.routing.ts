import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth-pages/auth-pages.module').then((m) => m.AuthPagesModule),
  },
  {
    path: '',
    loadChildren: () => import('./app-pages/app-pages.module').then((m) => m.AppPagesModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRouting {}
