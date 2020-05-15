import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [FooterComponent],
})
export class FooterModule {}
