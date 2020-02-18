import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InventoryFilter} from './model';

@Component({
  selector: 'app-inventory-filters',
  styleUrls: ['./inventory-filters.component.scss'],
  templateUrl: './inventory-filters.component.html'
})
export class InventoryFiltersComponent {
  /// binding
  @Input() disabled: boolean;
  @Input() filter: InventoryFilter = new InventoryFilter();
  @Output() changed = new EventEmitter<InventoryFilter>();

  /// constructor
  constructor() {
  }
}
