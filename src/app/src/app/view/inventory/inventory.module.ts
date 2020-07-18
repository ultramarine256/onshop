import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { ShopModule } from '../../domain';
import { ThemeModule } from '../../core/theme';

@NgModule({
  declarations: [InventoryComponent, FilterDialogComponent],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,

    /// core
    ThemeModule,

    /// domain
    ShopModule,

    /// routing
    InventoryRoutingModule,
  ],
})
export class InventoryModule {}
