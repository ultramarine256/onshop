import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from './orders';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class ProfileModule {
}
