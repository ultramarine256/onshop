import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectEntity} from '../../../../_data';

@Component({
  selector: 'app-project-list',
  templateUrl: './projects-list.component.html',
  styles: [`
    .project-name {
      cursor: pointer;
    }`]
})
export class AppProjectsListComponent {
  @Input() projects: Array<ProjectEntity> = [];
  @Output() itemClick = new EventEmitter<number>();

  showProject(id: number) {
    this.itemClick.emit(id);
  }
}


