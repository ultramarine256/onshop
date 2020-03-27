import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectEntity, ProjectRepository} from '../../../../_data';


@Component({
  selector: 'app-project-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class AppProjectsListComponent implements OnChanges {
  @Input() projects: Array<ProjectEntity> = [];

  constructor(private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('it works.');
  }

  showProject(id: number) {
    this.router.navigate([`project/${id}`]).then();
  }
}


