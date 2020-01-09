import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HeaderComponent} from './header';
import {FooterComponent} from './footer';
import {BreadcrumbsModule} from './breadcrumbs';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatStepperModule} from '@angular/material';


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

    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,

    /// app modules
    BreadcrumbsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,

    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [],
  entryComponents: []
})
export class ThemeModule {
}
