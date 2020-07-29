import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TagModel } from '../../../../data';

@Component({
  selector: 'app-inventory-filters',
  templateUrl: './inventory-filters.component.html',
  styleUrls: ['./inventory-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryFiltersComponent {
  @Input() tags: TagModel[];
  @Input() showTags: boolean;

  @Output() filterChanged = new EventEmitter();

  public selectedTag: TagModel;

  constructor() {}

  public getFilterData(): { tag: number } {
    return {
      tag: this.selectedTag?.id,
    };
  }

  public selectTag(tag: TagModel) {
    if (this.selectedTag === tag) {
      this.selectedTag = null;
    }
    this.selectedTag = tag;
    this.filterChanged.next({ tag: this.selectedTag?.id });
  }
}

export interface FilterFormData {
  tag: string;
}
