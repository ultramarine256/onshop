import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sorting-bar',
  styleUrls: ['./sorting-bar.component.scss'],
  templateUrl: './sorting-bar.component.html'
})
export class SortingBarComponent {
  @Output() sortQuery = new EventEmitter<SortItem>();
  public sortItemsArray: SortItem[] = [];

  constructor() {
    this.sortItemsArray = [{
      name: 'price',
      property: 'desc',
      title: 'price desc'
    },
      {
        name: 'price',
        property: 'asc',
        title: 'price asc'
      },
      {
        name: 'date',
        property: 'desc',
        title: 'date desc'
      },
      {
        name: 'date',
        property: 'asc',
        title: 'date asc'
      }];
  }

  public change(value) {
    if (value === 'All') {
      return this.sortQuery.emit(null);
    }
    this.sortItemsArray.forEach(x => {
      if (x.title === value) {
        return this.sortQuery.emit(x);
      }
    });
  }
}

class SortItem {
  name: string;
  property: string;
  title: string;

  constructor(name: string, property: string, title: string) {
    this.name = name;
    this.property = property;
    this.title = title;
  }
}
