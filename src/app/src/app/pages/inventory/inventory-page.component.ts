import {Component} from '@angular/core';
import {ProductsApiService} from '../../../_lib';

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent {
  /// fields


  /// constructor
  constructor(private productsApiService: ProductsApiService) {
    this.productsApiService.getProducts().subscribe(data => {
      console.log(data);
    });
  }
}
