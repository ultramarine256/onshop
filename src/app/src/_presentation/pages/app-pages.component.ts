import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { AppInfoModel, AppRepository, CategoryRepository, ProductRepository } from '@data/repository';
import { AppInfo, AuthService, CartService, InfoService } from '@domain/services';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

export class CategoryMenuModel {
  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
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
  public navigationMenu: CategoryMenuModel[] = [];
  public panelOpenState: boolean;
  public showCategories: boolean;
  public isLoading: boolean;
  public showSidenav: boolean;

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
    this.userName = this.authService.identity.firstName + ' ' + this.authService.identity.lastName;
    this.isLoading = false;
    forkJoin([this.appRepository.appInfo(), this.categoryRepository.getCategories()])
      .pipe(
        tap(() => console.log('load')),
        map(([appInfoModel, categories]) => {
          return [appInfoModel, categories.map((category) => new CategoryMenuModel(category.id, category.name))];
        }),
        tap(() => (this.isLoading = true))
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
