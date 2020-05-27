import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectRepository, ProjectResponse } from '@data/repository';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  public projects$: Observable<ProjectResponse[]>;

  constructor(private projectRepository: ProjectRepository) {}

  ngOnInit() {
    this.projects$ = this.projectRepository.getProjects();
  }
}
