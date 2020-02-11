import {AfterContentInit, Component} from '@angular/core';
import {CategoryEntity, ProductEntity, ShopRepository} from '../../../_data';
import {forkJoin} from 'rxjs';

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
      .subscribe((val: [Array<CategoryEntity>, Array<ProductEntity>]) => {
        this.categories = val[0];
        this.products = val[1];
        this._initOwl();
        this.didLoaded = true;
      });
  }

  /// helpers
  private _initOwl() {
    setTimeout(() => {
      (window as any).$('.products-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,

        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,

        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      });

      (window as any).$('.categories-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,

        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,

        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      });

    }, 200);
  }
}
