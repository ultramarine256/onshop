import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../_core';
import {ProductRepository} from '../../../../_data';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent {
  constructor(public authService: AuthService,
              public asd: ProductRepository,

              private router: Router) {

    console.log(this.authService.identity);


  }
}
