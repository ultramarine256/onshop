import {Component} from '@angular/core';
import {CartService} from '../../_core';

@Component({
  selector: 'app-pages-component',
  styleUrls: ['./app-pages.component.scss'],
  templateUrl: './app-pages.component.html',
})
export class AppPagesComponent {
  constructor(public cartService: CartService) {



    // this.cartService.itemsCount;

  }
}
