import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductSearchComponent} from './products-search.component';

@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  imports: [
    /// angular modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  exports: [
    ProductSearchComponent
  ],
  providers: [],
  entryComponents: []
})
export class ProductSearchModule {
}



