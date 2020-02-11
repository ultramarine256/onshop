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
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,

    /// theme
    ProductSearchModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
