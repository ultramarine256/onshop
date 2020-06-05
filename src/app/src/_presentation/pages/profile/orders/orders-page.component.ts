import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { OrderRepository } from '@data/repository';
import { OrderSearchResult } from '@data/repository/order/model/order-search-result';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent extends UnsubscribeMixin() implements OnInit {
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
}
