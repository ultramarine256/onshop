import {Component, Input} from '@angular/core';
import {UserModel, UserRepository} from '../../../../../_data';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-account-edit-page',
  templateUrl: './account-edit-page.component.html'
})
export class AccountEditPageComponent {
  @Input() set userProperties(value: UserModel) {
    console.log(value);
    this.setResult = value;
    this.profileForm = new FormGroup({
      firstName: new FormControl(value.firstName, Validators.required),
      lastName: new FormControl(value.lastName, Validators.required),
      username: new FormControl(value.username, Validators.required),
      billing: new FormGroup({
        firstName: new FormControl(value.billing.firstName, Validators.required),
        lastName: new FormControl(value.billing.lastName, Validators.required),
        phone: new FormControl(value.billing.phone),
        postcode: new FormControl(value.billing.postcode, Validators.required),
        city: new FormControl(value.billing.city, Validators.required),
        state: new FormControl(value.billing.state),
        email: new FormControl(value.billing.email, Validators.required),

      }),
      shipping: new FormGroup({
        firstName: new FormControl(value.shipping.firstName),
        lastName: new FormControl(value.shipping.lastName),
        city: new FormControl(value.shipping.city),
        postcode: new FormControl(value.shipping.postcode)
      })
    });
  };

  public profileForm: FormGroup;
  public setResult: UserModel;
  public password: string;

  constructor(public userRepository: UserRepository) {
  }

  onSubmit() {
    this.setResult.firstName = this.profileForm.get('firstName').value;
    this.setResult.lastName = this.profileForm.get('lastName').value;
    this.setResult.username = this.profileForm.get('username').value;
    this.setResult.billing = this.profileForm.get('billing').value;
    this.setResult.shipping = this.profileForm.get('shipping').value;
    this.editUser(this.setResult);
  }

  editUser(user: UserModel) {
    this.userRepository.editUser(user).subscribe((response) => {
      console.log(response);
      (window as any).toastr.options.positionClass = 'toast-top-center';
      (window as any).toastr.success('Done!');
    });

  }
}
