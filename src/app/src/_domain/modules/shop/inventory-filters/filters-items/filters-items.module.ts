import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DxRangeSliderModule} from 'devextreme-angular';
import {FiltersItemsComponent} from './filters-items.component';
import {FiltersItemsColorComponent} from './filters-items-color';
import {FiltersItemsMaterialComponent} from './filters-items-material';
import {FiltersItemsManufactureComponent} from './filters-items-manufacture';
import {FiltersItemsUsageComponent} from './filters-items-usage';
import {FiltersTemplateComponent} from './filters-template';

@NgModule({
  declarations: [
    FiltersTemplateComponent,
    FiltersItemsColorComponent,
    FiltersItemsManufactureComponent,
    FiltersItemsMaterialComponent,
    FiltersItemsUsageComponent,
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
    FiltersItemsColorComponent,
    FiltersItemsManufactureComponent,
    FiltersItemsMaterialComponent,
    FiltersItemsUsageComponent,
    FiltersItemsComponent
  ]
})
export class FiltersModule {
}
