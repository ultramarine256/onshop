import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryComponent } from './inventory.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterDialogComponent } from '@presentation/inventory/filter-dialog/filter-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ShopModule } from '@domain/modules/shop/shop.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { InventoryRoutingModule } from '@presentation/inventory/inventory-routing.module';

@NgModule({
  declarations: [InventoryComponent, FilterDialogComponent],
  imports: [
    InventoryRoutingModule,
    CommonModule,
    MatProgressSpinnerModule,
    ShopModule,
    FlexModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    FlexLayoutModule,
  ],
})
export class InventoryModule {}
