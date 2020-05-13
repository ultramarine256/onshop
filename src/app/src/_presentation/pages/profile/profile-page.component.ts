import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../_domain';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  constructor(public authService: AuthService, private router: Router) {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }
}
