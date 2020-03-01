import {AfterContentInit, Component} from '@angular/core';
import {CategoryModel, CategoryRepository, ProductModel, ProductRepository} from '../../../_data';
import {OWL_CAROUSEL} from '../../../_domain';
import {forkJoin} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements AfterContentInit {
  /// fields
  public products: Array<ProductModel> = [];
  public categories: Array<CategoryModel> = [];

  /// predicate
  public didLoaded = false;

  /// constructor
  constructor(private productRepository: ProductRepository,
              private categoryRepository: CategoryRepository) {
  }

  /// lifecycle
  ngAfterContentInit(): void {
    forkJoin(this.categoryRepository.getCategories(), this.productRepository.newArrivals())
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((val: [Array<CategoryModel>, Array<ProductModel>]) => {
        this.categories = val[0];
        this.products = val[1];
        setTimeout(() => {
          (window as any).$('.products-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS);
          (window as any).$('.categories-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS);
        }, 200);
      });
  }
}
