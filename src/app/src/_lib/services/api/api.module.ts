import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsApiService} from './product';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,
    HttpClientModule,

    /// app modules
  ],
  providers: [
    ProductsApiService
  ]
})
export class ApiModule {
}
