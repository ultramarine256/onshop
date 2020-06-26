import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { TagModel } from '@data/repository';
import { InventoryFiltersComponent } from '@domain/modules/shop/inventory-filters/inventory-filters.component';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  @ViewChild(InventoryFiltersComponent, { static: false })
  private inventoryFiltersComponent: InventoryFiltersComponent;

  public filters: { minPrice: number; maxPrice: number };
  public tags: TagModel[];

  constructor(private matDialogRef: MatDialogRef<FilterDialogComponent>) {}

  applyFilters() {
    this.matDialogRef.close(this.inventoryFiltersComponent.getFilterData());
  }
}
