import {Component} from '@angular/core';
import {AuthService} from '../../../../_domain';
import {ProjectRepository} from '../../../../_data/repository/project/project.repository';
import {ProjectResponse} from '../../../../_data/repository/project/model';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-projects-page',
  styleUrls: ['./projects-page.component.scss'],
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
        console.log(items);
        this.projects = items;
      });
  }

}
