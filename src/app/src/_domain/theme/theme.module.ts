import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FooterModule} from './footer';
import {BreadcrumbsModule} from './breadcrumbs';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatStepperModule} from '@angular/material';
import {ProductSearchModule} from './products-search';
import {HttpClientModule} from '@angular/common/http';
import {HeaderModule} from './header';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,

    /// app modules
    BreadcrumbsModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule
  ],
  exports: [
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FooterModule,
    HeaderModule,
    ProductSearchModule
  ],
  providers: [HttpClientModule],
  entryComponents: []
})
export class ThemeModule {
}

