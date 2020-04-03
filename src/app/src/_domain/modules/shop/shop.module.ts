import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from './checkout';
import {CategoryItemComponent} from './category-item';
import {RouterModule} from '@angular/router';
import {ProductItemComponent} from './product-item';
import {FiltersItemsComponent, FiltersModule, InventoryFiltersComponent} from './inventory-filters';
import {DxRangeSliderModule} from 'devextreme-angular';

@NgModule({
  declarations: [
    CategoryItemComponent,
    CheckoutComponent,
    InventoryFiltersComponent,
    ProductItemComponent
  ],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    /// dev-extreme
    DxRangeSliderModule,

    FiltersModule
  ],
  exports: [
    CategoryItemComponent,
    CheckoutComponent,
    InventoryFiltersComponent,
    ProductItemComponent
  ]
})
export class ShopModule {
}
