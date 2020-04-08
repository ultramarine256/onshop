import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsUsersComponent} from './movable-user-list';
import {AppProjectsListComponent} from './projects-list';
import {ProjectsAddComponent} from './project-create/project-create.component';
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
