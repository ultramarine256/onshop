import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartService} from './cart.service';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,

    /// app modules
  ],
  providers: [
    CartService
  ]
})
export class CartModule {
}
