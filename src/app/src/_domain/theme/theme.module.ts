import {NgModule} from '@angular/core';
import {FooterModule} from './footer';
import {BreadcrumbsModule} from './breadcrumbs';
import {ProductSearchModule} from './products-search';
import {HeaderModule} from './header';
import {ThirdPartyModule} from './_third-party';

@NgModule({
  declarations: [],
  imports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule
  ],
  exports: [
    ThirdPartyModule,
    BreadcrumbsModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule
  ]
})
export class ThemeModule {
}
