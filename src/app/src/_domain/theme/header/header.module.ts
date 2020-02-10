import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {ProductSearchModule} from '../products-search';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    /// angular modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    /// app modules
    ProductSearchModule,
    RouterModule

  ],
  exports: [
    HeaderComponent
  ],
  providers: [],
  entryComponents: []
})
export class HeaderModule {
}
