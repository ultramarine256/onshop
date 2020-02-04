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
import {AuthModule, CartModule, InfoModule} from '../../_core';
import {CartPageComponent} from './cart';
import {RepositoryModule} from '../../_data';
import {ThemeModule} from '../../_domain';
import {SearchResultPageComponent} from './search-result';
import {CheckoutPageComponent} from './checkout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DxSchedulerModule} from 'devextreme-angular';
import {LoginPageComponent} from './login';
import {AccountPageComponent, OrdersPageComponent, ProfilePageComponent} from './profile';

@NgModule({
  declarations: [
    AppPagesComponent,

    CartPageComponent,
    CategoriesPageComponent,
    CheckoutPageComponent,
    ContactUsPageComponent,
    HomePageComponent,
    InventoryPageComponent,
    ProductDetailsPageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    SearchResultPageComponent,
    TrackOrderPageComponent,
    AccountPageComponent,
    OrdersPageComponent
  ],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /// core
    CartModule,
    InfoModule,
    AuthModule,

    /// data
    RepositoryModule,

    /// theme
    ThemeModule,
    DxSchedulerModule,

    /// routing
    AppPagesRouting
  ],
  exports: [],
  providers: []
})
export class AppPagesModule {
}
