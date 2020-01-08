import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ShopRepository} from './shop';
import {AppRepository} from './app';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,
    HttpClientModule,

    /// app modules
  ],
  providers: [
    AppRepository,
    ShopRepository
  ]
})
export class RepositoryModule {
}
