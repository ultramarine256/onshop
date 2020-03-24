import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/app-pages.module').then(m => m.AppPagesModule),
    // loadChildren: './pages/app-pages.module#AppPagesModule',
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
// export const AppRouting: ModuleWithProviders = RouterModule.forChild(routes);
//src/admin/src/_presentation/pages/app-pages.module.ts  ./pages/app-pages.module#AppPagesModule
