import { NgModule } from '@angular/core';
import { MaterialThemeModule } from './_material';
import { ThirdPartyThemeModule } from './_third-party';
import { BreadcrumbsModule } from './breadcrumbs';
import { ContactFormModule } from './contact-form';
import { FooterModule } from './footer';
import { ItemsCarouselModule } from './items-carousel';
import { ProductSearchModule } from './products-search';
import { PromptModule } from './prompt';

@NgModule({
  declarations: [],
  imports: [
    MaterialThemeModule,
    ThirdPartyThemeModule,

    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    ItemsCarouselModule,
    ProductSearchModule,
    PromptModule,
  ],
  exports: [
    MaterialThemeModule,
    ThirdPartyThemeModule,

    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    ItemsCarouselModule,
    ProductSearchModule,
    PromptModule,
  ],
})
export class ThemeModule {}
