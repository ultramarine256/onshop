import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatFormFieldModule} from '@angular/material';
import {ProductSearchComponent} from './products-search.component';
import {ThirdPartyModule} from '../../../modules/_theme/_third-party';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  imports: [
    ThirdPartyModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    RouterModule
  ],
  exports: [
    ProductSearchComponent
  ]
})
export class ProductSearchModule {
}





