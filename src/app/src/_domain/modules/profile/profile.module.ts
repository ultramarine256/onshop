import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from './orders';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    OrdersComponent
  ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
  exports: [
    OrdersComponent
  ]
})
export class ProfileModule {
}
