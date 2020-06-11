import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

import { OrderResponse } from '@data/repository';
import { OrderSearchResult } from '@data/repository/order/model/order-search-result';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-orders-component',
  styleUrls: ['./orders.component.scss'],
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent extends UnsubscribeMixin() implements OnInit {
  @Input() orderSearchResult: OrderSearchResult;

  @Output() paramsChanged = new EventEmitter<{
    page?: number;
    status?: string;
  }>();

  constructor() {
    super();
  }

  ngOnInit() {}

  public getDaysLeft(order: OrderResponse): number {
    const deliveryEndDate = moment(order.deliveryDate).add(order.rentalDuration, 'days');
    const now = moment(new Date());
    return deliveryEndDate.diff(now, 'days');
  }

  public showDurationMessage(order: OrderResponse): boolean {
    return order.rentalDuration && order.deliveryDate.getTime() <= new Date().getTime();
  }

  public onPageChanged(page: number) {
    this.paramsChanged.emit({ page });
  }

  public onOrderFilterChange($event) {
    this.paramsChanged.emit({ status: $event.value });
  }

  public getOrderTotal(order: OrderResponse): number {
    return order.productItems.reduce((acc, item) => {
      return (acc += item.getPrice());
    }, 0);
  }

  public getDaysLeftMessage(order: OrderResponse): string {
    const daysLeft = this.getDaysLeft(order);
    if (daysLeft === 0) {
      return 'Today is last day';
    } else if (daysLeft === 1) {
      return '1 day left';
    }
    return `${daysLeft} days left`;
  }
}
