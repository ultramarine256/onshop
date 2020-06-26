import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptComponent } from './prompt/prompt.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [PromptComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatBottomSheetModule],
})
export class SharedModule {}
