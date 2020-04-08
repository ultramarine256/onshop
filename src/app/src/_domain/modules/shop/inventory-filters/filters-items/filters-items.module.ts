import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DxRangeSliderModule} from 'devextreme-angular';
import {FiltersItemsComponent} from './filters-items.component';
import {FiltersTemplateComponent} from './filters-template';

@NgModule({
  declarations: [
    FiltersTemplateComponent,
    FiltersItemsComponent
  ],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    /// dev-extreme
    DxRangeSliderModule
  ],
  exports: [
    FiltersTemplateComponent,

    FiltersItemsComponent
  ]
})
export class FiltersModule {
}
