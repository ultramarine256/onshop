import { Component, Input, OnInit } from '@angular/core';

import { CarouselItemModel } from '@domain/modules/_theme/items-carousel/models/carousel-item.model';

@Component({
  selector: 'app-items-carousel',
  styleUrls: ['./items-carousel.component.scss'],
  templateUrl: './items-carousel.component.html',
})
export class ItemsCarouselComponent implements OnInit {
  /// binding
  @Input() cssClass: number;
  @Input() items: Array<CarouselItemModel> = [];

  /// constructor
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      (window as any).$(`.${this.cssClass}`).owlCarousel({
        loop: true,
        margin: 10,
        nav: false,

        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,

        responsive: {
          0: {
            items: 2,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      });
    }, 200);
  }
}
