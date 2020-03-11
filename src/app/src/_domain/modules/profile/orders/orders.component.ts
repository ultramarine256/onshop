import {Component, Input} from '@angular/core';
import {OrderResponse} from '../../../../_data';

@Component({
  selector: 'app-orders-component',
  styleUrls: ['./orders.component.scss'],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  @Input() items: Array<OrderResponse> = [];
}
