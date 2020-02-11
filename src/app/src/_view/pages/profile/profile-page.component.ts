import {Component} from '@angular/core';
import {AuthService} from '../../../_core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  styleUrls: ['./profile-page.component.scss'],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent {
  constructor(public authService: AuthService,
              private router: Router) {
  }
  public logout() {
    this.authService.logout().subscribe(x => this.router.navigate(['/login']).then());
  }
}
