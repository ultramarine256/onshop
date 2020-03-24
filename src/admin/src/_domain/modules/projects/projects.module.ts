import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsUsersComponent} from './project-users';
import {AppProjectsListComponent} from './projects-list';

@NgModule({
  declarations: [
    ProjectsUsersComponent,
    AppProjectsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProjectsUsersComponent,
    AppProjectsListComponent
  ],
  providers: []
})
export class ProjectsModule {
}
