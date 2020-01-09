import {Component, Input} from '@angular/core';
import {CategoryEntity} from '../../../_core';

@Component({
  selector: 'app-header-component',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /// binding
  @Input() productsCount: number;
  @Input() productsPrice: number;
  @Input() categories: Array<CategoryEntity> = [];

  @Input() email: string;
  @Input() phone: string;

  /// constructor
  constructor() {
  }
}
