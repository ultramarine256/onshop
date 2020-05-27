import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  public validate(form: FormGroup) {
    const controls = Object.values(form.controls);
    controls.forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
    });
    return form.valid;
  }
}
