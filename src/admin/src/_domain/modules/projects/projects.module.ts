import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsUsersComponent} from './project-users';
import {AppProjectsListComponent} from './projects-list';
import {ProjectsAddComponent} from './project-add/project-add.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProjectsAddComponent,
    ProjectsUsersComponent,
    AppProjectsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjectsAddComponent,
    ProjectsUsersComponent,
    AppProjectsListComponent
  ],
  providers: []
})
export class ProjectsModule {
}
