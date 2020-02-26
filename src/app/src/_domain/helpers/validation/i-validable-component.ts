import {FormGroup} from '@angular/forms';

export interface IValidableComponent<T> {
  initEntityFromFormGroup(entity: T, formGroup: FormGroup): T;
  createForm(entity: T): FormGroup;
}
