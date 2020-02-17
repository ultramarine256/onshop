import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from './checkout';
import {CategoryItemComponent} from './category-item';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    CategoryItemComponent,
    CheckoutComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    CategoryItemComponent,
    CheckoutComponent
  ]
})
export class ShopModule {
}
