import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { AppInfoModel, AppRepository, CategoryRepository, ProductRepository } from '@data/repository';
import { AppInfo, AuthService, CartService, InfoService } from '@domain/services';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

export class CategoryMenuModel {
  id: string;
  title: string;
  slug: string;
  subCategories: CategoryMenuModel[] = [];

  constructor(props?: any) {
    this.id = props.id;
    this.title = props.name;
    this.slug = props.slug;
    this.subCategories = props.subCategories
      ? props.subCategories.map((subCategory) => new CategoryMenuModel(subCategory))
      : [];
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

  public navigationMenu: CategoryMenuModel[] = [];
  public panelOpenState: boolean;
  public showCategories: boolean;
  public showSidenav: boolean;
  public isLoading: boolean;

  constructor(
    private router: Router,
    public cartService: CartService,
    public infoService: InfoService,
    public authService: AuthService,
    private productRepository: ProductRepository,
    private appRepository: AppRepository,
    private categoryRepository: CategoryRepository
  ) {
    super();
  }

  ngOnInit() {
    // if (!this.authService.isAuthorized) {
    //   return;
    // }
    this.isLoading = true;
    forkJoin([this.appRepository.appInfo(), this.categoryRepository.getCategories()])
      .pipe(
        map(([appInfoModel, categories]) => {
          return [appInfoModel, categories.map((category) => new CategoryMenuModel(category))];
        }),
        tap(() => {
          this.isLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(([appInfoModel, categories]: [AppInfoModel, CategoryMenuModel[]]) => {
        this.infoService.setAppInfo(
          new AppInfo({ address: appInfoModel.address, email: appInfoModel.email, phone: appInfoModel.phone })
        );
        this.navigationMenu = categories;
      });
  }

  public onMenuClose() {
    this.showCategories = false;
    this.showSidenav = false;
  }

  public onMenuOpened() {
    this.showCategories = false;
    this.showSidenav = true;
  }
}
