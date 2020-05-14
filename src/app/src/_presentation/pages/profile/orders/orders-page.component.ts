import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderRepository, OrderResponse } from '@data/repository';
import { AuthService } from '@domain/services';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent implements OnInit {
  public orders$: Observable<OrderResponse[]>;

  constructor(public authService: AuthService, private orderRepository: OrderRepository) {}

  ngOnInit() {
    this.orders$ = this.orderRepository.getOrders();
  }
}
