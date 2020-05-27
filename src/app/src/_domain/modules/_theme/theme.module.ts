import { NgModule } from '@angular/core';

import { FooterModule } from './footer';
import { BreadcrumbsModule } from './breadcrumbs';
import { ThirdPartyModule } from './_third-party';
import { ContactFormModule } from './contact-form';
import { ItemsCarouselModule } from './items-carousel';
import { ProductSearchModule } from './products-search/products-search.module';

@NgModule({
  declarations: [],
  imports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    ProductSearchModule,
    ItemsCarouselModule,
  ],
  exports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    ProductSearchModule,
    ItemsCarouselModule,
  ],
})
export class ThemeModule {}
