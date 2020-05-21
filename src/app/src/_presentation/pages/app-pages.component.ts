import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { AppRepository, ProductRepository } from '@data/repository';
import { AppInfo, AuthService, CartService, InfoService } from '@domain/services';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

export class CategoryMenuModel {
  id: string;
  title: string;
  subCategories: ProductModel[];

  constructor(props?: any) {
    this.id = props.id;
    this.title = props.title;
    this.subCategories = props.subCategories.map((subCategory) => new ProductModel(subCategory));
  }
}

export class ProductModel {
  slug: string;
  title: string;

  constructor(props?: any) {
    this.slug = props.slug;
    this.title = props.title;
  }
}

@Component({
  selector: 'app-pages-component',
  styleUrls: ['./app-pages.component.scss'],
  templateUrl: './app-pages.component.html',
})
export class AppPagesComponent extends UnsubscribeMixin() implements OnInit, OnDestroy {
  @Output() inputChanged = new EventEmitter<string>();
  @Output() productChosen = new EventEmitter<string>();

  public userName: string;
  public navigationMenu: CategoryMenuModel[];
  public panelOpenState: boolean;
  public showCategories: boolean;

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
    this.userName = this.authService.identity.firstName + ' ' + this.authService.identity.lastName;
    this.appRepository
      .appInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.infoService.setAppInfo(new AppInfo({ address: data.address, email: data.email, phone: data.phone }));
      });

    this.navigationMenu = [
      {
        id: 'all',
        title: 'All',
        subCategories: [],
      },
    ].map((menu) => new CategoryMenuModel(menu));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onMenuClose() {
    this.showCategories = false;
  }
}
