import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { OrderRepository, OrderResponse } from '@data/repository';
import { OrderSearchResult } from '@data/repository/order/model/order-search-result';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends UnsubscribeMixin() implements OnInit {
  public orderSearchResult: OrderSearchResult;
  public isLoading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderRepository: OrderRepository
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        tap((params) => {
          this.isLoading = true;
        }),
        switchMap((params) => {
          return this.orderRepository.getOrders(params.page, params.status).pipe(tap(() => (this.isLoading = false)));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.orderSearchResult = data;
      });
  }

  public onParamsChange($event) {
    const queryParams: any = this.activatedRoute.queryParams;
    queryParams.page = $event.page;
    if ($event.status) {
      queryParams.status = $event.status;
    }
    this.router.navigate(['/orders'], { queryParams: { page: queryParams?.page, status: queryParams?.status } });
  }

  public getDaysLeft(order: OrderResponse): number {
    const deliveryEndDate = this.getDeliveryEndMomentDate(order);
    const now = moment(new Date());
    return deliveryEndDate.diff(now, 'days');
  }

  public showDurationMessage(order: OrderResponse): boolean {
    return order.rentalDuration && order.deliveryDate.getTime() <= new Date().getTime();
  }

  public onPageChanged(page: number) {
    this.onParamsChange({ page });
  }

  public onOrderFilterChange($event) {
    this.onParamsChange({ status: $event.value });
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

  public getLastDayOfRentDate(order: OrderResponse): Date {
    return this.getDeliveryEndMomentDate(order).toDate();
  }

  private getDeliveryEndMomentDate(order: OrderResponse) {
    return moment(order.deliveryDate).add(order.rentalDuration, 'days');
  }
}
