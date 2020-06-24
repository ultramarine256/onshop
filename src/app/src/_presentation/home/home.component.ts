import { AfterContentInit, Component } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { CategoryModel, CategoryRepository, OrderStatus, ProductModel, ProductRepository } from '@data/repository';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { OWL_CAROUSEL } from '@domain/modules/_theme/items-carousel/constants';
import { InfoService } from '@domain/services/info.service';

@Component({
  selector: 'app-home-page',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent extends UnsubscribeMixin() implements AfterContentInit {
  public products: Array<ProductModel> = [];
  public categories: Array<CategoryModel> = [];
  public orderStatus = OrderStatus;

  public productsInLoading: boolean;

  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    public infoService: InfoService
  ) {
    super();
  }

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
