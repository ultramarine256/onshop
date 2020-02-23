import {Component} from '@angular/core';
import {AuthService} from '../../../../_core';

@Component({
  selector: 'app-projects-page',
  styleUrls: ['./projects-page.component.scss'],
  templateUrl: './projects-page.component.html'
})
export class ProjectsPageComponent {
  constructor(public authService: AuthService) {}
}
