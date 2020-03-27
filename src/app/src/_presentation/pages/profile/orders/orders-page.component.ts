import {Component} from '@angular/core';
import {AuthService} from '../../../../_domain/services/auth';
import {OrderRepository, OrderResponse} from '../../../../_data/repository/order';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent {
  /// fields
  public items: Array<OrderResponse> = [];

  /// spinners
  public didLoaded = false;

  constructor(public authService: AuthService,
              private orderRepository: OrderRepository) {
    this.orderRepository.getOrders()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: Array<OrderResponse>) => this.items = items);
  }
}
