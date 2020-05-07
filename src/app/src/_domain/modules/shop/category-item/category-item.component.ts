import { Component, Input } from '@angular/core';

import { CategoryModel } from '@data/index';

@Component({
  selector: 'app-category-item',
  styleUrls: ['./category-item.component.scss'],
  templateUrl: './category-item.component.html',
})
export class CategoryItemComponent {
  @Input() category: CategoryModel;

  constructor() {}

  public clearStorage() {
    localStorage.removeItem('pageForPagination');
    localStorage.removeItem('amountForPagination');
  }
}
