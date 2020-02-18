import {Component, Input} from '@angular/core';
import {ProductEntity} from '../../../../_data';

@Component({
  selector: 'app-product-item',
  styleUrls: ['./product-item.component.scss'],
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
  /// binding
  @Input() item: ProductEntity;

  /// constructor
  constructor() {
  }
}
