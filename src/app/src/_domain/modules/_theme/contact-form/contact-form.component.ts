import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  styleUrls: ['./contact-form.component.scss'],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  @Output() formChanged = new EventEmitter<FormGroup>();
  profileForm: FormGroup;
  profileFormCreated = false;

  constructor() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.formChanged.emit(this.profileForm.value);
    this.profileForm.reset();
    this.profileFormCreated = true;
  }
}
