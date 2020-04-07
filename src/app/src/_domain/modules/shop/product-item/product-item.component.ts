import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductModel} from '../../../../_data';

@Component({
  selector: 'app-product-item',
  styleUrls: ['./product-item.component.scss'],
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
  /// binding
  @Input() allowPurchase: boolean;
  @Input() item: ProductModel;
  @Input() baseUrl: string;
  @Output() addToCart = new EventEmitter<ProductModel>();
  public showPopUp = false;

  /// constructor
  constructor() {
  }

  public popUpFunction(event) {
    this.showPopUp = true;
    setTimeout(() => {
      this.showPopUp = false;
    }, 3000);
  }

  public addCart(item, event) {
    if (!this.allowPurchase) {
      this.addToCart.emit(null);
    } else {
      this.addToCart.emit(item);
      this.popUpFunction(event);
    }
  }
}
