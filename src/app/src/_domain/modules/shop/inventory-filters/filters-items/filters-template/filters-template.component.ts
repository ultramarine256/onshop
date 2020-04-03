import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterItemModel} from '../../../../../../_data/repository/product/model/filterItem.model';

@Component({
  selector: 'app-filters-template',
  templateUrl: './filters-template.component.html'
})
export class FiltersTemplateComponent {
  @Input() filters: FilterItemModel;
  @Output() setFilter = new EventEmitter<FilterToSet>();

  public chosenFilter(filterProperty: string) {
    const completeFilter = new FilterToSet(this.filters.name, filterProperty);
    this.setFilter.emit(completeFilter);
  }

}

export class FilterToSet {
  name: string;
  property: string;

  constructor(name, property) {
    this.name = name;
    this.property = property;
  }
}
