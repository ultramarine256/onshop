import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppRepository, ProductRepository} from '../../_data';
import {AppInfo, AuthService, CartService, InfoService, Product} from '../../_domain';

@Component({
  selector: 'app-pages-component',
  styleUrls: ['./app-pages.component.scss'],
  templateUrl: './app-pages.component.html',
})
export class AppPagesComponent {
  /// constructor
  constructor(
    public cartService: CartService,
    public infoService: InfoService,
    private productRepository: ProductRepository,
    private appRepository: AppRepository,
    public authService: AuthService,
    private router: Router
  ) {
    this.appRepository
      .appInfo()
      .subscribe((data) =>
        this.infoService.setAppInfo(new AppInfo({address: data.address, email: data.email, phone: data.phone}))
      );
  }

  /// methods

  public productRedirect(slug: string) {
    this.router.navigate([`product/${slug}`]).then();
  }
}
