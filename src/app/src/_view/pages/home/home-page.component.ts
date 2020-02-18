import {AfterContentInit, Component} from '@angular/core';
import {CategoryEntity, ProductEntity, ShopRepository} from '../../../_data';
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
  public products: Array<ProductEntity> = [];
  public categories: Array<CategoryEntity> = [];

  /// predicate
  public didLoaded = false;

  /// constructor
  constructor(private shopRepository: ShopRepository) {
  }

  /// lifecycle
  ngAfterContentInit(): void {
    forkJoin(this.shopRepository.getCategories(), this.shopRepository.newArrivals())
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((val: [Array<CategoryEntity>, Array<ProductEntity>]) => {
        this.categories = val[0];
        this.products = val[1];
        setTimeout(() => {
          (window as any).$('.products-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS);
          (window as any).$('.categories-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS);
        }, 200);
      });
  }
}
