import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { UnsubscribeMixin } from '../../core';
import { CartService, AppInfo, InfoService, AuthService } from '../../domain';
import { ProductRepository, AppRepository, CategoryRepository, UserRepository } from '../../data';

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
  selector: 'app-app-pages',
  styleUrls: ['./app-pages.component.scss'],
  templateUrl: './app-pages.component.html',
})
export class AppPagesComponent extends UnsubscribeMixin() implements OnInit {
  @Output() inputChanged = new EventEmitter<string>();
  @Output() productChosen = new EventEmitter<string>();

  public navigationMenu$ = this.categoryRepository.categories$.pipe(
    map((categories) => categories.map((category) => new CategoryMenuModel(category)))
  );
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
    private userRepository: UserRepository
  ) {
    super();

    // updates.available.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   updates.activateUpdate().then(() => document.location.reload());
    // });
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

    this.categoryRepository
      .getCategories()
      .pipe(
        map((categories) => categories.map((category) => new CategoryMenuModel(category))),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.appRepository
      .appInfo()
      .pipe(
        map((appInfoModel) => appInfoModel),
        finalize(() => {
          this.infoIsLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((appInfoModel) => {
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

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
