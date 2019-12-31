import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-component',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  /// binding
  @Input() productsCount: number;
  @Input() productsPrice: number;

  constructor() {
  }
}
