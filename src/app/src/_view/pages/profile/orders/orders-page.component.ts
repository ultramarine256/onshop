import {Component} from '@angular/core';
import {AuthService} from '../../../../_core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent {
  constructor(public authService: AuthService,
              private router: Router) {
  }
}
