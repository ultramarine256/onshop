import {FormGroup} from '@angular/forms';

export class ValidationHelper {

  /// methods
  public static isValid(propName: string, form: FormGroup): boolean {
    let result = false;
    try {
      result = form.get(propName).valid && form.get(propName).dirty && form.get(propName).value !== '';
    } catch (e) {
      console.log(`Wrong property name: ${propName}`);
    }

    return result;
  }

  public static isInvalid(propName: string, form: FormGroup): boolean {
    let result = false;
    try {
      result = form.get(propName).invalid && (form.get(propName).dirty || form.get(propName).touched);
    } catch (e) {
      console.log(`Wrong property name: ${propName}`);
    }
    return result;
  }
}
