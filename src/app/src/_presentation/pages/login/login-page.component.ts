import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {
  AuthService,
  ValidationHelper,
  UserToken,
  IdentityResponse,
  LoginResponse
} from '../../../_domain';
import {ProductRepository, UserRepository} from '../../../_data';

@Component({
  selector: 'app-login-page',
  styleUrls: ['./login-page.component.scss'],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  /// fields
  public errorMessage = '';

  /// validation
  public loginForm: FormGroup;
  public validationHelper = ValidationHelper;

  /// spinners
  public loginProcessing = false;
  public registerIsLoading = false;

  /// constructor
  constructor(private userRepository: UserRepository,
              private productRepository: ProductRepository,
              public authService: AuthService,
              private router: Router) {
    this.loginForm = this.createLoginForm();
  }

  /// methods
  public login(login: string, password: string) {
    this.errorMessage = '';
    this.loginProcessing = true;
    this.authService.login(login, password).subscribe((item: LoginResponse) => {
      this.authService.setToken(new UserToken({token: item.jwt}));
      this.authService.getUserIdentityInfo(item.jwt).subscribe((response: IdentityResponse) => {
        this.authService.setIdentity(response);
        this.loginProcessing = false;
        this.router.navigate(['/profile']).then();
      }, () => {
      });
    }, () => {
      this.loginProcessing = false;
      this.errorMessage = 'Login or password was incorrect.';
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }

  /// validation
  public createLoginForm(): FormGroup {
    return new FormGroup({
      login: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
