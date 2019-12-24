import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home';
import {AppPagesRouting} from './app-pages.routing';
import {AppPagesComponent} from './app-pages.component';
import {CategoriesPageComponent} from './categories';
import {ThemeModule} from '../../_lib';
import {InventoryPageComponent} from './inventory';
import {ContactUsPageComponent} from './contact-us';
import {ProductDetailsPageComponent} from './product-details';
import {ProfilePageComponent} from './profile';
import {TrackOrderPageComponent} from './track-order';

@NgModule({
  declarations: [
    AppPagesComponent,
    HomePageComponent,
    CategoriesPageComponent,
    InventoryPageComponent,
    ProductDetailsPageComponent,
    ContactUsPageComponent,
    ProfilePageComponent,
    TrackOrderPageComponent
  ],
  imports: [
    /// angular modules
    CommonModule,

    /// app modules
    ThemeModule,

    /// routing
    AppPagesRouting
  ],
  exports: [],
  providers: []
})
export class AppPagesModule {
}
