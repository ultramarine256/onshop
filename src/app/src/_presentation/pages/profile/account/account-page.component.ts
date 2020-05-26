import { Component, OnInit } from '@angular/core';
import { UserModel, UserRepository } from '@data/repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';

import { FormsService } from '@shared/services/forms.service';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent extends UnsubscribeMixin() implements OnInit {
  public edit: boolean;

  public isLoading: boolean;
  public settingsForm: FormGroup;
  public isInProgress: boolean;
  public password: string;

  public user: UserModel;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public userRepository: UserRepository,
    private formService: FormsService
  ) {
    super();
  }

  ngOnInit() {
    this.isLoading = true;
    this.userRepository
      .getUser()
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((user) => {
        this.user = user;
        this.settingsForm = this.getProfileForm(this.user);
      });
  }

  private getProfileForm(user: UserModel): FormGroup {
    return this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      username: [user.username, Validators.required],
      billing: this.fb.group({
        firstName: [user.billing.firstName],
        lastName: [user.billing.lastName],
        phone: [user.billing.phone],
        postcode: [user.billing.postcode],
        city: [user.billing.city],
        state: [user.billing.state],
        email: [user.billing.email, [Validators.required, Validators.email]],
      }),
      shipping: this.fb.group({
        firstName: [user.shipping.firstName],
        lastName: [user.shipping.lastName],
        city: [user.shipping.city],
        postcode: [user.shipping.postcode],
      }),
    });
  }

  public submit() {
    if (!this.formService.validate(this.settingsForm)) {
      return false;
    }

    this.isInProgress = true;
    const settingsFormData = { ...this.settingsForm.value };
    // Change camelCase to underscore
    const updatedUserData = {
      ...settingsFormData,
      ...{
        first_name: settingsFormData.firstName,
        last_name: settingsFormData.lastName,
        date_created: this.user.dateCreated,
        billing: {
          ...settingsFormData.billing,
          ...{ first_name: settingsFormData.billing.firstName, last_name: settingsFormData.billing.lastName },
        },
        shipping: {
          ...settingsFormData.shipping,
          ...{ first_name: settingsFormData.shipping.firstName, last_name: settingsFormData.shipping.lastName },
        },
      },
    };

    this.userRepository
      .editUser(updatedUserData)
      .pipe(
        tap(() => {
          this.isInProgress = false;
          this.edit = false;
          this.snackBar.open('Settings updated', null, {
            duration: 2000,
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        // after success update user model
        this.user.firstName = updatedUserData.first_name;
        this.user.lastName = updatedUserData.last_name;
        this.user.email = updatedUserData.billing.email;
      });
  }

  public cancel() {
    this.edit = false;
  }
}
