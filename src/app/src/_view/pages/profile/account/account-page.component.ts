import {Component} from '@angular/core';
import {AuthService} from '../../../../_core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent {
  constructor(public authService: AuthService,
              private router: Router) {
  }
}
