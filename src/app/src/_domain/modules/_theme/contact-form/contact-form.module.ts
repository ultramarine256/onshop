import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form.component';

@NgModule({
  declarations: [ContactFormComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [ContactFormComponent],
})
export class ContactFormModule {}
