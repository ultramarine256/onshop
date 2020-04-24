import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from './checkout';
import {CategoryItemComponent} from './category-item';
import {RouterModule} from '@angular/router';
import {ProductItemComponent} from './product-item';
import {InventoryFiltersComponent} from './inventory-filters';
import {DxNumberBoxModule, DxRangeSliderModule, DxSliderModule} from 'devextreme-angular';
import {SortingBarComponent} from './sorting-bar';
import {InventoryPaginationComponent} from './inventory-pagination';

@NgModule({
  declarations: [
    CategoryItemComponent,
    CheckoutComponent,
    InventoryFiltersComponent,
    InventoryPaginationComponent,
    ProductItemComponent,
    SortingBarComponent
  ],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    /// dev-extreme
    DxRangeSliderModule,
    DxSliderModule,
    DxNumberBoxModule,
  ],
  exports: [
    CategoryItemComponent,
    CheckoutComponent,
    InventoryFiltersComponent,
    InventoryPaginationComponent,
    ProductItemComponent,
    SortingBarComponent
  ]
})
export class ShopModule {
}
