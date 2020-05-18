import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {ProductSearchModule} from '../products-search';
import {RouterModule} from '@angular/router';
import {MatBadgeModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,

    /// theme
    ProductSearchModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
