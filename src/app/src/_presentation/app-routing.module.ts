import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@domain/auth/guards/auth.guard';

import { PurchaseReturnsComponent } from './pages/purchase-returns/purchase-returns.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';

const routes: Routes = [
  // lazy modules
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./account-settings/account-settings.module').then((m) => m.AccountSettingsModule),
  },
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    loadChildren: () => import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // pages
  {
    path: 'return-product/:id',
    canActivate: [AuthGuard],
    component: PurchaseReturnsComponent,
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoriesComponent,
  },
  {
    path: 'categories/:categorySlug',
    canActivate: [AuthGuard],
    component: SubCategoriesComponent,
  },
  {
    path: 'product/:slug',
    canActivate: [AuthGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchResultComponent,
  },
  {
    path: 'contact-us',
    canActivate: [AuthGuard],
    component: ContactUsComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'track-order',
    component: TrackOrderComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // for debug set it to "true"
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
