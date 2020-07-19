import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShopModule } from '../../domain';
import { ThemeModule } from '../../core';

import { ProjectsComponent } from './projects';
import { CartComponent } from './cart';
import { CategoriesComponent } from './categories';
import { ContactUsComponent } from './contact-us';
import { OrdersComponent } from './orders';
import { ProductDetailsComponent } from './product-details';
import { PurchaseReturnsComponent } from './purchase-returns';
import { SearchResultComponent } from './search-result';
import { SubCategoriesComponent } from './sub-categories';
import { TrackOrderComponent } from './track-order';
import { HowItWorksComponent } from './how-it-works';
import { ProjectComponent } from './project';
import { AppPagesComponent } from './app-pages.component';
import { HomeComponent } from './home';
import { CheckoutComponent } from './checkout';
import { AccountSettingsComponent } from './account-settings';
import { FilterDialogComponent, InventoryComponent } from './inventory';
import { AppPagesRoutingModule } from './app-pages.routing';

@NgModule({
  declarations: [
    AppPagesComponent,

    AccountSettingsComponent,
    CartComponent,
    CategoriesComponent,
    CheckoutComponent,
    ContactUsComponent,
    HomeComponent,
    OrdersComponent,
    ProductDetailsComponent,
    PurchaseReturnsComponent,
    SearchResultComponent,
    SubCategoriesComponent,
    TrackOrderComponent,
    ProjectsComponent,
    HowItWorksComponent,
    InventoryComponent,
    FilterDialogComponent,
    ProjectComponent,
  ],
  exports: [
    AccountSettingsComponent,
    CartComponent,
    CategoriesComponent,
    CheckoutComponent,
    ContactUsComponent,
    HomeComponent,
    OrdersComponent,
    ProductDetailsComponent,
    PurchaseReturnsComponent,
    SearchResultComponent,
    SubCategoriesComponent,
    TrackOrderComponent,
    ProjectsComponent,
    HowItWorksComponent,
    InventoryComponent,
    FilterDialogComponent,
    ProjectComponent,
  ],
  imports: [
    /// angular
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,

    /// core
    ThemeModule,

    /// domain
    ShopModule,

    /// routing
    AppPagesRoutingModule,
  ],
})
export class AppPagesModule {}
