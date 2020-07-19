import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PromptComponent } from './prompt.component';

@NgModule({
  declarations: [PromptComponent],
  imports: [
    /// angular
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,

    /// theme
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [PromptComponent],
})
export class PromptModule {}
