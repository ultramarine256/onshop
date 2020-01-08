import {AfterViewInit, Component} from '@angular/core';
import {ShopRepository} from '../../../_data/repository/shop';
import {CategoryEntity} from '../../../_core/domain/entities/shop-module';

@Component({
  selector: 'app-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements AfterViewInit {
  /// fields
  public categories: Array<CategoryEntity> = [];

  /// predicates
  public categoryIsLoaded = false;

  /// constructor
  constructor(private shopApiService: ShopRepository) {
  }

  ngAfterViewInit(): void {
    this.shopApiService.getCategories().subscribe(data => {
      this.categories = data;

      setTimeout(() => {
        this.initOwl();
      }, 0);
    });
  }

  /// methods
  public initOwl() {
    (window as any).$('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: false,

      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,

      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  }
}
