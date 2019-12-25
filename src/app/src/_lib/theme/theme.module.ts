import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HeaderComponent} from './header';
import {FooterComponent} from './footer';
import {BreadcrumbsModule} from './breadcrumbs';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    /// angular modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,

    /// app modules
    BreadcrumbsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  entryComponents: []
})
export class ThemeModule {
}
