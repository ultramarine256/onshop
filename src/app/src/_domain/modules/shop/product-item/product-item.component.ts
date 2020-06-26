import { Component, Input } from '@angular/core';

import { ProductModel } from '@data/repository';

@Component({
  selector: 'app-product-item',
  styleUrls: ['./product-item.component.scss'],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product: ProductModel;
  @Input() baseUrl: string;

  constructor() {}

  public getFormattedProductTitle(title: string): string {
    return title
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
