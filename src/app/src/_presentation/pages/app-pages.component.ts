import {Component} from '@angular/core';
import {AppInfo, AuthService, CartService, InfoService, ProductEntity} from '../../_core';
import {ProductFilter, ShopRepository} from '../../_data';
import {Product} from '../../_domain';
import {AppMapper} from '../_mapper';

@Component({
  selector: 'app-pages-component',
  styleUrls: ['./app-pages.component.scss'],
  templateUrl: './app-pages.component.html',
})
export class AppPagesComponent {

  /// fields
  public productItems: Array<Product> = [];

  /// constructor
  constructor(public cartService: CartService,
              public infoService: InfoService,
              private shopRepository: ShopRepository,
              public authService: AuthService) {
    this.shopRepository.getShopInfo().subscribe(data =>
      this.infoService.setAppInfo(new AppInfo({address: data.address, email: data.email, phone: data.phone})));
  }

  /// methods
  public inputChanged(input: string) {
    this.shopRepository.getProducts(new ProductFilter({search: input})).subscribe((items: ProductEntity[]) => {
      this.productItems = AppMapper.ToProducts(items);
    });
  }
}
