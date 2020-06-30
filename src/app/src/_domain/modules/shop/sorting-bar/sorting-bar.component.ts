import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

export interface SortingOption {
  name: string;
  property: string;
  title: string;
  visible: boolean;
}

@Component({
  selector: 'app-sorting-bar',
  styleUrls: ['./sorting-bar.component.scss'],
  templateUrl: './sorting-bar.component.html',
})
export class SortingBarComponent extends UnsubscribeMixin() implements OnInit {
  public sortControl: FormControl;
  public sortingOptions: SortingOption[] = [];
  public selectedFilter: string;

  @Input() set setCurrentFilter(value) {
    this.selectedFilter = value;
  }

  @Output() sortTypeChanged = new EventEmitter<SortingOption>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.sortControl = new FormControl('default');
    this.sortControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      const option = this.sortingOptions.find((sortingOption) => sortingOption.title === value);
      this.sortTypeChanged.emit(option);
    });

    this.sortingOptions = [
      {
        name: 'default',
        property: 'default',
        title: 'Default',
        visible: true,
      },
      {
        name: 'price',
        property: 'desc',
        title: 'Price desc',
        visible: true,
      },
      {
        name: 'price',
        property: 'asc',
        title: 'Price asc',
        visible: true,
      },
      {
        name: 'arrived',
        property: 'desc',
        title: 'Arrived desc',
        visible: true,
      },
      {
        name: 'arrived',
        property: 'asc',
        title: 'Arrived asc',
        visible: true,
      },
    ];
  }
}
