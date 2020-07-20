import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { InventoryFiltersComponent } from '../../../../domain';
import { TagModel } from '../../../../data';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  @ViewChild(InventoryFiltersComponent, { static: false })
  private inventoryFiltersComponent: InventoryFiltersComponent;

  public tags: TagModel[];

  constructor(private matDialogRef: MatDialogRef<FilterDialogComponent>) {}

  applyFilters() {
    this.matDialogRef.close(this.inventoryFiltersComponent.getFilterData());
  }
}
