import {NgModule} from '@angular/core';
import {FooterModule} from './footer';
import {BreadcrumbsModule} from './breadcrumbs';
import {ProductSearchModule} from './products-search/products-search.module';
import {HeaderModule} from './header';
import {ThirdPartyModule} from './_third-party';
import {ContactFormModule} from './contact-form';
import {ItemsCarouselModule} from './items-carousel';


@NgModule({
  declarations: [],
  imports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule,
    ItemsCarouselModule
  ],
  exports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule,
    ItemsCarouselModule
  ]
})
export class ThemeModule {
}
