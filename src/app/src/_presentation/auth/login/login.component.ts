import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { ProductRepository, UserRepository } from '@data/index';
import { FormsService } from '@shared/services/forms.service';
import { AuthService } from '@domain/auth/auth.service';
import { LoginResponse } from '@domain/auth/dtos/login.response';
import { IdentityResponse } from '@domain/auth/dtos/identity.response';
import { UserToken } from '@domain/auth/entities/user-token';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends UnsubscribeMixin() implements OnInit {
  public loginForm: FormGroup;
  public loginProcessing = false;

  constructor(
    private snackBar: MatSnackBar,
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    public authService: AuthService,
    private router: Router,
    private formService: FormsService
  ) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  public login() {
    if (!this.formService.validate(this.loginForm)) {
      return false;
    }

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.loginProcessing = true;
    this.authService
      .login(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (item: LoginResponse) => {
          this.authService.setToken(new UserToken({ token: item.jwt }));
          this.authService
            .getUserIdentityInfo(item.jwt)
            .pipe(
              finalize(() => (this.loginProcessing = false)),
              takeUntil(this.destroy$)
            )
            .subscribe((response: IdentityResponse) => {
              this.authService.setIdentity(response);
              this.loginProcessing = false;
              this.router.navigate(['/']);
            });
        },
        (e) => {
          this.loginProcessing = false;
          this.snackBar.open(e.error.message, null, {
            duration: 2000,
          });
        }
      );
  }

  public createLoginForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
