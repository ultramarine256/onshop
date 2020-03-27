import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppRepository, ProductFilter, ProductRepository} from '../../_data';
import {AppInfo, AuthService, CartService, InfoService, Product} from '../../_domain';
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
              private productRepository: ProductRepository,
              private appRepository: AppRepository,
              public authService: AuthService,
              private router: Router) {
    this.appRepository.appInfo()
      .subscribe(data =>
        this.infoService.setAppInfo(new AppInfo({address: data.address, email: data.email, phone: data.phone})));
  }

  /// methods
  public inputChanged(input: string) {
    this.productRepository.getProducts(new ProductFilter({search: input}))
      .subscribe(result => this.productItems = AppMapper.ToProducts(result.items));
  }

  public productRedirect(slug: string) {
    this.router.navigate([`product/${slug}`]).then();
  }
}



