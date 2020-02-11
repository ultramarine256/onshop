import {Component} from '@angular/core';
import {CartService} from '../../../_core';

@Component({
  selector: 'app-cart-page',
  styleUrls: ['./cart-page.component.scss'],
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {
  /// fields

  /// constructor
  constructor(public cartService: CartService) {
  }
}
