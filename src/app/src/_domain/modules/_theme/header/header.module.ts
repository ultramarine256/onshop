import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ThirdPartyModule } from '@domain/modules/_theme/_third-party';
import { HeaderComponent } from './header.component';
import { ProductSearchModule } from '../products-search';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,

    // Third parties
    ThirdPartyModule,

    /// theme
    ProductSearchModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
