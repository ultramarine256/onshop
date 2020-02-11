import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryEntity} from '../../../_data';

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

  @Input() isAuthorized: string;
  @Input() profilePageUrl: string;
  @Input() loginPageUrl: string;


  @Input() searchResults: Array<any> = [];
  @Output() inputChanged = new EventEmitter<string>();
  @Output() productChosen = new EventEmitter<string>();

  /// constructor
  constructor() {
  }
}


