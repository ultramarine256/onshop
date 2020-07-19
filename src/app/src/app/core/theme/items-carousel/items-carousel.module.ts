import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ItemsCarouselComponent} from './items-carousel.component';

@NgModule({
  declarations: [
    ItemsCarouselComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    ItemsCarouselComponent
  ]
})
export class ItemsCarouselModule {
}
