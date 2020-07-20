import { Component } from '@angular/core';
import { CategoryModel, OrderStatus, ProductModel } from '../../../data';
import { InfoService } from '../../../domain';

@Component({
  selector: 'app-home-page',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public products: Array<ProductModel> = [];
  public categories: Array<CategoryModel> = [];
  public orderStatus = OrderStatus;

  constructor(public infoService: InfoService) {}
}
