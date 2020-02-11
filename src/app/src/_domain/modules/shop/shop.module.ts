import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from './checkout';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    CheckoutComponent
  ]
})
export class ShopModule {
}
