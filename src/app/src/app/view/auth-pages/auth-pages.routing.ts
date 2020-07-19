import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login';
import { AuthPagesComponent } from './auth-pages.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPagesComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
