import {NgModule} from '@angular/core';
import {FooterModule} from './footer';
import {BreadcrumbsModule} from './breadcrumbs';
import {ProductSearchModule} from './products-search';
import {HeaderModule} from './header';
import {ThirdPartyModule} from './_third-party';
import {ContactFormModule} from './contact-form';

@NgModule({
  declarations: [],
  imports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule
  ],
  exports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    ContactFormModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule
  ]
})
export class ThemeModule {
}
