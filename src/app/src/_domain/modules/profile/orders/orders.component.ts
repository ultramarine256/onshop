import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-orders-component',
  styleUrls: ['./orders.component.scss'],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  /// binding
  @Input() phone: string;

  /// constructor
  constructor() {
  }
}
