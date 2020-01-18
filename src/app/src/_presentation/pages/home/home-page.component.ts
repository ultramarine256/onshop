import {AfterContentInit, Component} from '@angular/core';
import {ShopRepository} from '../../../_data';
import {CategoryEntity} from '../../../_core';

@Component({
  selector: 'app-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements AfterContentInit {
  /// fields
  public categories: Array<CategoryEntity> = [];

  /// constructor
  constructor(private shopRepository: ShopRepository) {
  }

  /// lifecycle
  ngAfterContentInit(): void {
    this.shopRepository.getCategories().subscribe(data => {
      this.categories = data;
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
