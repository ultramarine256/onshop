import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../domain/auth/guards';
import { PurchaseReturnsComponent } from './purchase-returns';
import { CategoriesComponent } from './categories';
import { SubCategoriesComponent } from './sub-categories';
import { ProductDetailsComponent } from './product-details';
import { SearchResultComponent } from './search-result';
import { ContactUsComponent } from './contact-us';
import { OrdersComponent } from './orders';
import { ProjectsComponent } from './projects';
import { ProjectComponent } from './project';
import { TrackOrderComponent } from './track-order';
import { CartComponent } from './cart';
import { HowItWorksComponent } from './how-it-works';
import { HomeComponent } from './home';
import { CheckoutComponent } from './checkout';
import { AccountSettingsComponent } from './account-settings';
import { InventoryComponent } from './inventory';
import { AppPagesComponent } from './app-pages.component';

const routes: Routes = [
  {
    path: '',
    component: AppPagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },

      /// categories
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/:categorySlug',
        component: SubCategoriesComponent,
      },

      /// inventory
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'inventory/:categoryId',
        component: InventoryComponent,
      },

      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'profile',
        component: AccountSettingsComponent,
      },
      {
        path: 'return-product/:id',
        component: PurchaseReturnsComponent,
      },

      {
        path: 'product/:slug',
        component: ProductDetailsComponent,
      },
      {
        path: 'search',
        component: SearchResultComponent,
      },
      {
        path: 'contact-us',
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
        path: 'projects/:id',
        component: ProjectComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesRoutingModule {}
