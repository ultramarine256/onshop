import { NgModule } from '@angular/core';

import { ProductSearchModule } from './products-search/products-search.module';
import { BreadcrumbsModule } from '@domain/modules/_theme/breadcrumbs/breadcrumbs.module';
import { ItemsCarouselModule } from '@domain/modules/_theme/items-carousel/items-carousel.module';
import { ContactFormModule } from '@domain/modules/_theme/contact-form/contact-form.module';
import { FooterModule } from '@domain/modules/_theme/footer/footer.module';

@NgModule({
  declarations: [],
  imports: [BreadcrumbsModule, ContactFormModule, FooterModule, ProductSearchModule, ItemsCarouselModule],
  exports: [BreadcrumbsModule, ContactFormModule, FooterModule, ProductSearchModule, ItemsCarouselModule],
})
export class ThemeModule {}
