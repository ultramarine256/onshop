import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ProjectEntity, ProjectRepository} from '../../../../_data';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html'
})
export class ProjectDetailPageComponent implements OnInit {
  public entity: ProjectEntity = new ProjectEntity();
  public projectDeleted = false;

  constructor(private projectRepository: ProjectRepository,
              private route: ActivatedRoute,
              private location: Location) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async x => this.entity = await this.projectRepository.getProjectById(x.id).toPromise());
  }

  async deleteCurrentProject(id: number) {
    this.projectDeleted = true;
    await this.projectRepository.deleteProject(id).toPromise().then(() => this.projectDeleted = false);
    alert('deleted');
    this.location.back();
  }
}
