import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ThirdPartyModule } from '@domain/modules/_theme/_third-party';
import { CategoryItemComponent } from './category-item';
import { ProductItemComponent } from './product-item';
import { InventoryFiltersComponent } from './inventory-filters';
import { SortingBarComponent } from './sorting-bar';

@NgModule({
  declarations: [
    CategoryItemComponent, //
    InventoryFiltersComponent,
    ProductItemComponent,
    SortingBarComponent,
  ],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    ThirdPartyModule,
  ],
  exports: [
    CategoryItemComponent, //
    InventoryFiltersComponent,
    ProductItemComponent,
    SortingBarComponent,
  ],
})
export class ShopModule {}
