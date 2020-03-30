import {Component} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {ProjectRepository, ProjectEntity} from '../../../_data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html'
})
export class ProjectPageComponent {
  public didLoaded: boolean;
  public showProject: boolean;
  public projects: Array<ProjectEntity> = [];

  constructor(private projectRepository: ProjectRepository,
              private router: Router) {
    this.projectRepository.getProjects()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: Array<ProjectEntity>) => this.projects = items);
  }

  public getFormResponse(event) {
    this.projects.push(event);
    window.location.reload();
  }

  showProj(id: number) {
    this.router.navigate([`project/${id}`]).then();
  }
}
