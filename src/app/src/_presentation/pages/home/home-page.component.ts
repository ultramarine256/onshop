import { AfterContentInit, Component, HostBinding } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';

import { OWL_CAROUSEL } from '@domain/modules';
import { CategoryModel, CategoryRepository, ProductModel, ProductRepository } from '../../../_data';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { InfoService } from '@domain/services';
import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent extends UnsubscribeMixin() implements AfterContentInit {
  @HostBinding('@pageAnimations')

  /// fields
  public products: Array<ProductModel> = [];
  public categories: Array<CategoryModel> = [];

  /// predicate
  public productsInLoading: boolean;

  /// constructor
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    public infoService: InfoService
  ) {
    super();
  }

  /// lifecycle
  ngAfterContentInit(): void {
    this.productsInLoading = true;
    this.productRepository
      .newArrivals()
      .pipe(
        tap(() => (this.productsInLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((products) => {
        this.products = products;
        setTimeout(() => {
          (window as any).$('.products-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS);
          (window as any).$('.categories-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS);
        }, 200);
      });

    this.categoryRepository.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      this.categories = categories;
    });
  }
}
