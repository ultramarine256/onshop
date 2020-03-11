import {finalize} from 'rxjs/operators';
import {Component, Input} from '@angular/core';
import {OrderResponse, OrderRepository} from '../../../../_data';
import {AuthService} from '../../../services';

@Component({
  selector: 'app-orders-component',
  styleUrls: ['./orders.component.scss'],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  /// binding
  // @Input() phone: string;
  public items: Array<OrderResponse> = [];

  /// predicates
  public didLoaded = false;
  public showDescription = false;
  public itemClicked: number;
  public closeItem: number;

  /// constructor
  constructor(public authService: AuthService,
              private orderRepository: OrderRepository) {
    this.orderRepository.getOrders()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: Array<OrderResponse>) => {
        this.items = items;
        console.log(items);
      });
  }

/// methods
  showFullDescription(id: number) {
    this.showDescription = true;
    this.itemClicked = id;
  }

  closeFullDescription() {
    this.showDescription = false;
    this.itemClicked = 0;
  }

}
