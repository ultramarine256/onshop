import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';

import { ShopModule } from '@domain/modules/shop/shop.module';

import { ProjectsComponent } from './projects/projects.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PurchaseReturnsComponent } from './purchase-returns/purchase-returns.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

@NgModule({
  declarations: [
    CartComponent,
    CategoriesComponent,
    ContactUsComponent,
    OrdersComponent,
    ProductDetailsComponent,
    PurchaseReturnsComponent,
    SearchResultComponent,
    SubCategoriesComponent,
    TrackOrderComponent,
    ProjectsComponent,
    HowItWorksComponent,
  ],
  exports: [
    CartComponent,
    CategoriesComponent,
    ContactUsComponent,
    OrdersComponent,
    ProductDetailsComponent,
    PurchaseReturnsComponent,
    SearchResultComponent,
    SubCategoriesComponent,
    TrackOrderComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    FlexModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatProgressBarModule,
    ShopModule,
    NgxPaginationModule,
    ExtendedModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class PagesModule {}
