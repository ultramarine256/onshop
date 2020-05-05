import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home';
import {AppPagesRouting} from './app-pages.routing';
import {AppPagesComponent} from './app-pages.component';
import {CategoriesPageComponent} from './categories';
import {InventoryPageComponent} from './inventory';
import {ContactUsPageComponent} from './contact-us';
import {ProductDetailsPageComponent} from './product-details';
import {TrackOrderPageComponent} from './track-order';
import {CartPageComponent} from './cart';
import {SearchResultPageComponent} from './search-result';
import {CheckoutPageComponent} from './checkout';
import {LoginPageComponent} from './login';
import {AccountEditPageComponent, AccountPageComponent, OrdersPageComponent, ProfilePageComponent, ProjectsPageComponent} from './profile';
import {
  RepositoryModule
} from '../../_data';
import {
  AuthModule,
  CartModule,
  InfoModule,
  ProfileModule,
  ShopModule,
  ThemeModule
} from '../../_domain';
import {DxSchedulerModule, DxTemplateModule} from 'devextreme-angular';
import {PurchaseReturnsPageComponent} from './purchase-returns';


@NgModule({
  declarations: [
    AppPagesComponent,

    PurchaseReturnsPageComponent,
    CartPageComponent,
    CategoriesPageComponent,
    CheckoutPageComponent,
    ContactUsPageComponent,
    HomePageComponent,
    InventoryPageComponent,
    ProductDetailsPageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    ProjectsPageComponent,
    SearchResultPageComponent,
    TrackOrderPageComponent,
    AccountEditPageComponent,
    AccountPageComponent,
    OrdersPageComponent
  ],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /// data
    RepositoryModule,
    DxSchedulerModule,
    DxTemplateModule,
    /// domain
    ShopModule,
    ProfileModule,
    ThemeModule,
    CartModule,
    InfoModule,
    AuthModule,

    /// routing
    AppPagesRouting
  ],
  exports: [],
  providers: []
})
export class AppPagesModule {
}
