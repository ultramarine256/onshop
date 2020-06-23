import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectRepository, ProjectResponse } from '@data/repository';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public projects$: Observable<ProjectResponse[]>;

  constructor(private projectRepository: ProjectRepository) {}

  ngOnInit() {
    this.projects$ = this.projectRepository.getProjects();
  }
}
