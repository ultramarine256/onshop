import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterItemModel} from '../model';


@Component({
  selector: 'app-filters-template',
  styleUrls: ['./filters-template.component.scss'],
  templateUrl: './filters-template.component.html'
})
export class FiltersTemplateComponent {
  @Input()
  public set filters(items: FilterItemModel) {
    console.log(items);
    if (items.filter_items) {
      this.filter.name = items.name;
      this.filter.filter_items = items.filter_items.sort((a, b) => {
        return b.count - a.count;
      });
    }
  }

  @Output() setFilter = new EventEmitter<FilterToSet>();
  public filter: FilterItemModel;

  constructor() {
    this.filter = new FilterItemModel();
  }

  public chosenFilter(filterProperty: string) {
    const completeFilter = new FilterToSet(this.filter.name, filterProperty);
    this.setFilter.emit(completeFilter);
  }
}

class FilterToSet {
  name: string;
  property: string;
  checked: boolean;

  constructor(name, property) {
    this.name = name;
    this.property = property;

  }
}
