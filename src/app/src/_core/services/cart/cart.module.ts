import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CartService} from './cart.service';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,
    HttpClientModule,

    /// app modules
  ],
  providers: [
    CartService
  ]
})
export class CartModule {
}
