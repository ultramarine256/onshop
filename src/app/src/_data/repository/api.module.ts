import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ShopApiService} from './shop';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,
    HttpClientModule,

    /// app modules
  ],
  providers: [
    ShopApiService
  ]
})
export class ApiModule {
}
