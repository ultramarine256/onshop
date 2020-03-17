import {Component, Input} from '@angular/core';
import {ProjectResponse} from '../../../../_data/repository/project/model';

@Component({
  selector: 'app-projects-component',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  @Input() items: Array<ProjectResponse>;
}
