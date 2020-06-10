import { Component, OnInit } from '@angular/core';
import { UserModel, UserRepository } from '@data/repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent extends UnsubscribeMixin() implements OnInit {
  public showInfo: boolean;

  public isLoading: boolean;
  public settingsForm: FormGroup;

  public user: UserModel;

  constructor(private fb: FormBuilder, public userRepository: UserRepository) {
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
}
