import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoryItemComponent } from './category-item/category-item.component';
import { InventoryFiltersComponent } from './inventory-filters/inventory-filters.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SortingBarComponent } from './sorting-bar/sorting-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

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
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
  ],
  exports: [
    CategoryItemComponent, //
    InventoryFiltersComponent,
    ProductItemComponent,
    SortingBarComponent,
  ],
})
export class ShopModule {}
