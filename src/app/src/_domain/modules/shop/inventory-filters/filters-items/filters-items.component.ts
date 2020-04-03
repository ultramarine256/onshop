import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterItems} from './model';

@Component({
  selector: 'app-filters-items',
  styleUrls: ['./filters-items.component.scss'],
  templateUrl: './filters-items.component.html'
})
export class FiltersItemsComponent implements OnInit {
  @Input() filter: any;
  @Output() setFilter = new EventEmitter<string>();

  public filters: FilterItems;
  public filtersArray: Array<FiltersProperties> = [];
  private filtersItems = '';
  public check = false;

  constructor() {
    this.filters = new FilterItems();
  }

  ngOnInit() {
    console.log(this.filter.filters);
  }

  public _setFilters(event) {
    const newFilter = new FiltersProperties(event.name, event.property);
    let controll = false;

    this.filtersArray.forEach(x => {
      if (x.name === newFilter.name) {
        const i = this.filtersArray.indexOf(x);
        controll = true;
        if (this.filtersArray[i].properties.includes(event.property)) {
          const j = this.filtersArray[i].properties.indexOf(event.property);
          this.filtersArray[i].properties.splice(j, 1);
          if (this.filtersArray[i].properties.length === 0) {
            this.filtersArray.splice(i, 1);
            // tslint:disable-next-line:triple-equals
            // if (this.filtersArray.length === 0) {
            //   return this.setFilter.emit(this.filtersItems);
            // }
          }
        } else {
          this.filtersArray[i].properties.push(event.property);
        }

      }
    });
    if (!controll) {
      this.filtersArray.push(newFilter);
    }
    this.filtersItems = (this.filtersArray.length !== 0 ? '?filter={' : '');
    this.filtersArray.forEach(x => {
      const a = this.setQuery(x.properties);
      this.filtersItems += (this.filtersArray.indexOf(x) !== 0 ? ',' : '') + '"' + x.name + '":[' + a + ']}';
    });
    this.setFilter.emit(this.filtersItems);
  }

  public setQuery(items: Array<string>) {
    let query = '';
    items.map(x => {
      if (items.indexOf(x) === items.length - 1) {
        query += `"${x}"`;
      } else {
        query += `"${x}",`;
      }
    });
    console.log(query);
    return query;
  }
}

export class FiltersProperties {
  name: string;
  properties: Array<string> = [];

  constructor(name, property) {
    this.name = name;
    this.properties.push(property);
  }
}
