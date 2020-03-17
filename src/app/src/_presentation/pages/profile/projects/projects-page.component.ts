import {Component} from '@angular/core';
import {AuthService} from '../../../../_domain';
import {ProjectRepository, ProjectResponse} from '../../../../_data/repository/project';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html'
})
export class ProjectsPageComponent {
  public didLoaded: boolean;
  public projects: Array<ProjectResponse> = [];

  constructor(public authService: AuthService,
              private projectRepository: ProjectRepository) {
    this.projectRepository.getOrders()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: Array<ProjectResponse>) => {
        this.projects = items;
      });
  }
}
