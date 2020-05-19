import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { AppRepository, ProductFilter, ProductRepository } from '@data/repository';
import { AppInfo, AuthService, CartService, InfoService } from '@domain/services';
import { Product } from '@domain/modules';
import { AppMapper } from '@presentation/_mapper';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-pages-component',
  styleUrls: ['./app-pages.component.scss'],
  templateUrl: './app-pages.component.html',
})
export class AppPagesComponent extends UnsubscribeMixin() implements OnInit {
  public productItems: Product[] = [];

  constructor(
    private router: Router,
    public cartService: CartService,
    public infoService: InfoService,
    public authService: AuthService,
    private productRepository: ProductRepository,
    private appRepository: AppRepository
  ) {
    super();
  }

  ngOnInit() {
    this.appRepository
      .appInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.infoService.setAppInfo(new AppInfo({ address: data.address, email: data.email, phone: data.phone }));
      });
  }

  public inputChanged(input: string) {
    this.productRepository
      .getProducts(new ProductFilter({ search: input }))
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => (this.productItems = AppMapper.ToProducts(result.items)));
  }

  public productRedirect(slug: string) {
    this.router.navigate([`product/${slug}`]).then();
  }
}
