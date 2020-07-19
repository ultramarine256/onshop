import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryItemComponent } from './category-item';
import { InventoryFiltersComponent } from './inventory-filters';
import { ProductItemComponent } from './product-item';
import { SortingBarComponent } from './sorting-bar';
import { ThemeModule } from '../../../core';

@NgModule({
  declarations: [CategoryItemComponent, InventoryFiltersComponent, ProductItemComponent, SortingBarComponent],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    /// core
    ThemeModule,
  ],
  exports: [CategoryItemComponent, InventoryFiltersComponent, ProductItemComponent, SortingBarComponent],
})
export class ShopModule {}
