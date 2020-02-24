import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductSearchComponent} from './products-search.component';

@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ProductSearchComponent
  ]
})
export class ProductSearchModule {
}





