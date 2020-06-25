import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppInfoModel, AppRepository, CategoryRepository, ProductRepository, UserRepository } from '../_data';
import { Router } from '@angular/router';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { AuthService } from '@domain/auth/auth.service';
import { CartService } from '@domain/cart/cart.service';
import { AppInfo, InfoService } from '@domain/services/info.service';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends UnsubscribeMixin() implements OnInit {
  @Output() inputChanged = new EventEmitter<string>();
  @Output() productChosen = new EventEmitter<string>();

  public navigationMenu: CategoryMenuModel[] = [];
  public panelOpenState: boolean;
  public showCategories: boolean;
  public showSidenav: boolean;
  public infoIsLoading = true;
  public userIsLoading = true;

  constructor(
    private router: Router,
    public cartService: CartService,
    public infoService: InfoService,
    public authService: AuthService,
    private productRepository: ProductRepository,
    private appRepository: AppRepository,
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
    private updates: SwUpdate
  ) {
    super();

    updates.available.pipe(takeUntil(this.destroy$)).subscribe(() => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit() {
    this.userRepository
      .getUser()
      .pipe(
        catchError((e) => {
          this.userIsLoading = false;
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    forkJoin([this.appRepository.appInfo(), this.categoryRepository.getCategories()])
      .pipe(
        map(([appInfoModel, categories]) => {
          return [appInfoModel, categories.map((category) => new CategoryMenuModel(category))];
        }),
        finalize(() => {
          this.infoIsLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(([appInfoModel, categories]: [AppInfoModel, CategoryMenuModel[]]) => {
        this.infoService.setAppInfo(
          new AppInfo({
            address: appInfoModel.address,
            email: appInfoModel.email,
            phone: appInfoModel.phone,
            promo1: appInfoModel.promo1,
            promo2: appInfoModel.promo2,
            deliveryFee: appInfoModel.deliveryFee,
            deliveryDuration: appInfoModel.deliveryDuration,
          })
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

  // Show cart icon if we not on cart page
  public get showCart(): boolean {
    return !(this.router.url.indexOf('/cart') > -1 || this.router.url.indexOf('/checkout') > -1);
  }

  public get isLoading(): boolean {
    return this.infoIsLoading && this.userIsLoading;
  }
}
