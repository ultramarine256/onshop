import {Component} from '@angular/core';
import {ProjectResponse} from '../../../_data/repository/project/model';
import {ProjectRepository} from '../../../_data/repository/project';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public didLoaded: boolean;
  public projects: Array<ProjectResponse> = [];

  constructor(private projectRepository: ProjectRepository) {
    this.projectRepository.getOrders()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: Array<ProjectResponse>) => {
        this.projects = items;
      });
  }
}
