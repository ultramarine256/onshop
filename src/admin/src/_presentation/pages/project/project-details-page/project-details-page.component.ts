import {Component, OnInit} from '@angular/core';
import {ProjectEntity} from '../../../../_data/repository/project/entity';
import {ProjectRepository} from '../../../../_data/repository/project';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html'
})
export class ProjectDetailPageComponent implements OnInit {
  public entity: ProjectEntity;

  constructor(private projectRepository: ProjectRepository,
              private route: ActivatedRoute,
              private _location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectRepository.getProjectById(params.id).subscribe(item => {
        this.entity = item;
      });
    });
  }

  deleteCurrentProject(id: number) {
    this.projectRepository.deleteProject(id).subscribe(() => {
      alert('deleted');
      this._location.back();
    });
  }

  close() {
    this._location.back();
  }
}
