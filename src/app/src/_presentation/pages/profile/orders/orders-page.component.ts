import {Component} from '@angular/core';

@Component({
  selector: 'app-orders-page',
  styleUrls: ['./orders-page.component.scss'],
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent {
  /// fields
  // public items: Array<OrderResponse> = [];
  //
  // /// predicates
  // public didLoaded = false;
  //
  // /// constructor
  // constructor(public authService: AuthService,
  //             private orderRepository: OrderRepository) {
  //   this.orderRepository.getOrders()
  //     .pipe(finalize(() => this.didLoaded = true))
  //     .subscribe((items: Array<OrderResponse>) => this.items = items);
  // }
}
