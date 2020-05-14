import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { AuthService, UserToken, IdentityResponse, LoginResponse } from '@domain/index';
import { ProductRepository, UserRepository } from '@data/index';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends UnsubscribeMixin() implements OnInit {
  /// fields
  public errorMessage = '';

  /// validation
  public loginForm: FormGroup;

  /// spinners
  public loginProcessing = false;

  /// constructor
  constructor(
    private snackBar: MatSnackBar,
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    public authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  /// methods
  public login() {
    this.loginProcessing = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .login(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (item: LoginResponse) => {
          this.authService.setToken(new UserToken({ token: item.jwt }));
          this.authService
            .getUserIdentityInfo(item.jwt)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: IdentityResponse) => {
              this.authService.setIdentity(response);
              this.loginProcessing = false;
              this.router.navigate(['/profile']).then();
            });
        },
        () => {
          this.loginProcessing = false;
          this.snackBar.open('Login or password was incorrect.', null, {
            duration: 2000,
          });
        }
      );
  }

  /// validation
  public createLoginForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
