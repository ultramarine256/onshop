import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';

import { SearchResultFilters } from '@data/repository';

@Component({
  selector: 'app-inventory-filters',
  styleUrls: ['./inventory-filters.component.scss'],
  templateUrl: './inventory-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryFiltersComponent {
  @Input() showCategory: boolean;
  @Input() filter: SearchResultFilters;

  @Output() filterChanged = new EventEmitter<string>();

  public selection = new SelectionModel<any>(true, []);

  public toggleFilter(category: string, filter: any) {
    this.selection.toggle(JSON.stringify({ category, filter }));
    this.filterChanged.emit(this.getSerializedFilters(this.selection.selected));
  }

  private getSerializedFilters(selectedData: any): string {
    const data = selectedData
      .map((selection) => JSON.parse(selection))
      .reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category] = acc[item.category].concat(item.filter.name);
        return acc;
      }, {});

    return Object.values(data).length ? JSON.stringify(data).slice(1) : '';
  }
}
