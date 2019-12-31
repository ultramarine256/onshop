import {Component} from '@angular/core';
import {ShopApiService} from '../../../_core';

@Component({
  selector: 'app-categories-page',
  styleUrls: ['./categories-page.component.scss'],
  templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent {

  /// constructor
  constructor(private shopApiService: ShopApiService) {
    this.shopApiService.getCategories().subscribe(data => {
      console.log(data);
    });
  }
}
