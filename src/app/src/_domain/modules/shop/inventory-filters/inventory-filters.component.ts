import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { TagModel } from '@data/repository';

@Component({
  selector: 'app-inventory-filters',
  styleUrls: ['./inventory-filters.component.scss'],
  templateUrl: './inventory-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryFiltersComponent extends UnsubscribeMixin() implements OnInit, AfterViewInit {
  @Input() filters: { minPrice: number; maxPrice: number };
  @Input() tags: TagModel[];
  @Input() showTags: boolean;

  @Output() filterChanged = new EventEmitter();

  public filterForm: FormGroup;
  public minPrice = new FormControl();
  public maxPrice = new FormControl();
  public selectedTag: TagModel;

  public tagChanged = new Subject();

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      price: [null],
      forRent: [null],
      forSale: [null],
    });
  }

  ngAfterViewInit() {
    this.filterForm.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => this.filterChanged.next(this.getFilterData()));

    this.tagChanged.pipe(takeUntil(this.destroy$)).subscribe(() => this.filterChanged.next(this.getFilterData()));
  }

  public getFilterData(): FilterFormData {
    return {
      ...this.filterForm.value,
      tag: this.selectedTag?.id,
    };
  }

  public onPriceChange([minPrice, maxPrice]: [number, number]) {
    this.minPrice.setValue(minPrice);
    this.maxPrice.setValue(maxPrice);
  }

  public onMinMaxPriceChange(minPrice: number, maxPrice: number) {
    this.filterForm.get('price').setValue([minPrice, maxPrice]);
  }

  public selectTag(tag: TagModel) {
    if (this.selectedTag === tag) {
      this.selectedTag = null;
    }
    this.selectedTag = tag;
    this.tagChanged.next(tag);
  }
}

export interface FilterFormData {
  price: number[];
  forRent: boolean;
  forSale: boolean;
  tag: string;
}
