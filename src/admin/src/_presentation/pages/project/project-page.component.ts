import {Component} from '@angular/core';
import {ProjectRepository} from '../../../_data/repository/project';
import {finalize} from 'rxjs/operators';
import {ProjectEntity} from '../../../_data/repository/project/entity';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html'
})
export class ProjectPageComponent {
  public didLoaded: boolean;
  public showProject: boolean;
  public projects: Array<ProjectEntity> = [];

  constructor(private projectRepository: ProjectRepository) {
    this.projectRepository.getProjects()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: Array<ProjectEntity>) => this.projects = items);
  }

  public getFormResponse(event) {
    console.log(event);
    this.projects.push(event);
  }
}
