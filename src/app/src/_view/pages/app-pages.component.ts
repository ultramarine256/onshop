import {Component} from '@angular/core';
import {AppInfo, AuthService, CartService, InfoService} from '../../_core';
import {ProductEntity, ProductFilter, ShopRepository} from '../../_data';
import {Product} from '../../_domain';
import {AppMapper} from '../_mapper';
import {Router} from '@angular/router';

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
              public authService: AuthService,
              private router: Router) {
    this.shopRepository.getShopInfo().subscribe(data =>
      this.infoService.setAppInfo(new AppInfo({address: data.address, email: data.email, phone: data.phone})));
  }

  /// methods
  public inputChanged(input: string) {
    // this.shopRepository.getProducts(new ProductFilter({search: input})).subscribe((items: ProductEntity[]) => {
    //   this.productItems = AppMapper.ToProducts(items);
    // });
  }

  public productRedirect(slug: string) {
    this.router.navigate([`product/${slug}`]).then();
  }
}
