import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCreatePopupComponent } from './project-create-popup';
import { ProjectEditPopupComponent } from './project-edit-popup';
import { ProjectShowPopupComponent } from './project-show-popup';
import { ProjectsUsersComponent } from './movable-user-list';

@NgModule({
  declarations: [ProjectCreatePopupComponent, ProjectEditPopupComponent, ProjectShowPopupComponent, ProjectsUsersComponent],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    /// core
    ThemeModule,
  ],
  exports: [ProjectCreatePopupComponent, ProjectEditPopupComponent, ProjectShowPopupComponent, ProjectsUsersComponent],
  providers: [],
})
export class ProjectsModule {}
