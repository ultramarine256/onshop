import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectEntity, ProjectRepository} from '../../../../_data';


@Component({
  selector: 'app-project-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class AppProjectsListComponent {
  @Input() projects: Array<ProjectEntity> = [];

  constructor(private projectRepository: ProjectRepository,
              private router: Router) {

  }

  showProject(id: number) {
    this.router.navigate([`project/${id}`]).then();
  }

  deleteCurrentProject(id: number) {
    // this.projectRepository.deleteProject(id).subscribe(() => alert('deleted'));
  }

}


