import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-checkout-component',
  styleUrls: ['./checkout.component.scss'],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  /// binding
  @Input() phone: string;

  /// constructor
  constructor() {
  }
}
