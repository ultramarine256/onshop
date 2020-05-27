import { Component, Input } from '@angular/core';

import { ProjectResponse } from '@data/repository';

@Component({
  selector: 'app-projects-component',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  @Input() projects: ProjectResponse[];

  constructor() {}
}
