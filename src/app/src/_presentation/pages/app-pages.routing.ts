import { AppPagesComponent } from './app-pages.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './home';
import { InventoryPageComponent } from './inventory';
import { ContactUsPageComponent } from './contact-us';
import { ProductDetailsPageComponent } from './product-details';
import { CategoriesPageComponent } from './categories';
import { TrackOrderPageComponent } from './track-order';
import { CartPageComponent } from './cart';
import { SearchResultPageComponent } from './search-result';
import { CheckoutPageComponent } from './checkout';
import { LoginPageComponent } from './login';
import { AccountPageComponent, OrdersPageComponent, ProfilePageComponent, ProjectsPageComponent } from './profile';
import { PurchaseReturnsPageComponent } from './purchase-returns';
import { AuthGuard } from '@domain/services/auth/guards/auth.guard';
import { NoAuthGuard } from '@domain/services/auth/guards/no-auth.guard';
import { SubCategoriesComponent } from '@presentation/pages/sub-categories';

export const routes: Routes = [
  {
    path: '',
    component: AppPagesComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: HomePageComponent,
      },
      {
        path: 'cart',
        canActivate: [AuthGuard],
        component: CartPageComponent,
      },
      {
        path: 'return-product/:id',
        canActivate: [AuthGuard],
        component: PurchaseReturnsPageComponent,
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutPageComponent,
      },
      {
        path: 'categories',
        canActivate: [AuthGuard],
        component: CategoriesPageComponent,
      },
      {
        path: 'categories/:categorySlug',
        canActivate: [AuthGuard],
        component: SubCategoriesComponent,
      },
      {
        path: 'inventory/:categoryId',
        canActivate: [AuthGuard],
        component: InventoryPageComponent,
      },
      {
        path: 'product/:slug',
        canActivate: [AuthGuard],
        component: ProductDetailsPageComponent,
      },
      {
        path: 'search',
        canActivate: [AuthGuard],
        component: SearchResultPageComponent,
      },
      {
        path: 'contact-us',
        canActivate: [AuthGuard],
        component: ContactUsPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [NoAuthGuard],
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfilePageComponent,
        children: [
          {
            path: '',
            component: AccountPageComponent,
          },
        ],
      },
      {
        path: 'orders',
        component: OrdersPageComponent,
      },
      {
        path: 'projects',
        component: ProjectsPageComponent,
      },
      {
        path: 'track-order',
        component: TrackOrderPageComponent,
      },
    ],
  },
];
export const AppPagesRouting: ModuleWithProviders = RouterModule.forChild(routes);
