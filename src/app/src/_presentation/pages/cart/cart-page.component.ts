import {Component} from '@angular/core';
import {CartService} from '../../../_core';

@Component({
  selector: 'app-cart-page',
  styleUrls: ['./cart-page.component.scss'],
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {

  /// fields
  public imtes = [1, 2, 3, 4, 5];

  /// constructor
  constructor(public cartService: CartService) {
  }
}
