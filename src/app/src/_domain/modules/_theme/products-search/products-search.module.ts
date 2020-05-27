import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductSearchComponent } from './products-search.component';
import { ThirdPartyModule } from '@domain/modules/_theme/_third-party';

@NgModule({
  declarations: [ProductSearchComponent],
  imports: [ThirdPartyModule, FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [ProductSearchComponent],
})
export class ProductSearchModule {}
