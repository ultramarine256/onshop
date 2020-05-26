import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as moment from 'moment';

import { OrderResponse } from '@data/repository';

@Component({
  selector: 'app-orders-component',
  styleUrls: ['./orders.component.scss'],
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  @Input() orders: OrderResponse[];

  panelOpenState: boolean;

  public getDurationEndDateMessage(order: OrderResponse) {
    const daysLeft = this.getDaysLeft(order);
    return daysLeft === 1 ? '1 day left' : `${daysLeft} days left`;
  }

  private getDaysLeft(order: OrderResponse) {
    const deliveryDate = moment(this.getDurationEndDate(order), 'M/D/YYYY');
    const dateToday = moment(new Date(), 'M/D/YYYY');
    return deliveryDate.diff(dateToday, 'days');
  }

  private getDurationEndDate(order: OrderResponse): Date {
    const rentalDurations = order.rentalDuration;
    return moment().add(rentalDurations, 'days').toDate();
  }
}
