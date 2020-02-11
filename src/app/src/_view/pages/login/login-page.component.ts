import {Component} from '@angular/core';
import {ShopRepository, UserRepository} from '../../../_data';
import {AuthService, ValidationHelper} from '../../../_core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
              private shopRepository: ShopRepository,
              public authService: AuthService,
              private router: Router) {
    this.loginForm = this.createLoginForm();
  }

  /// methods
  public login(login: string, password: string) {
    this.errorMessage = '';
    this.loginProcessing = true;
    this.authService.login(login, password).subscribe(item => {
      this.loginProcessing = false;
      if (item.ok) {
        this.router.navigate(['/profile']).then();
      } else {
        this.errorMessage = item.message;
      }
    });
  }

  public logout() {
    this.authService.logout()
      .subscribe(data => {
        console.log(data);
      });
  }

  public getOrders() {
    this.userRepository.getOrders().subscribe((data) => {
      console.log(data);
    });
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
