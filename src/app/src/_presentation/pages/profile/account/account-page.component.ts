import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProductRepository} from '../../../../_data';
import {AuthService} from '../../../../_domain';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent {
  constructor(public authService: AuthService) {

    console.log(this.authService.identity);
  }
}
