import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../_core';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent {
  constructor(public authService: AuthService,
              private router: Router) {
  }
}
