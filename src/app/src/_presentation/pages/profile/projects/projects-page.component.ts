import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectRepository, ProjectResponse } from '@data/repository';
import { AuthService } from '@domain/services';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
})
export class ProjectsPageComponent implements OnInit {
  public projects$: Observable<ProjectResponse[]>;

  constructor(public authService: AuthService, private projectRepository: ProjectRepository) {}

  ngOnInit() {
    this.projects$ = this.projectRepository.getOrders();
  }
}
