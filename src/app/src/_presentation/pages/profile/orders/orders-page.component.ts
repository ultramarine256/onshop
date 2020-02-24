import {Component} from '@angular/core';
import {UserRepository} from '../../../../_data';
import {AuthService} from '../../../../_domain';

@Component({
  selector: 'app-orders-page',
  styleUrls: ['./orders-page.component.scss'],
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent {
  constructor(public authService: AuthService,
              private userRepository: UserRepository) {

    // this.userRepository.getOrders().subscribe();
  }
}
