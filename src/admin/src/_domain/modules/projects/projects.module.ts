import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '@shared/shared.module';

import { ProjectsUsersComponent } from './movable-user-list';
import { ProjectCreatePopupComponent } from './project-create-popup/project-create-popup.component';

@NgModule({
  declarations: [ProjectCreatePopupComponent, ProjectsUsersComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MatButtonModule, MatDialogModule, MatSnackBarModule],
  exports: [ProjectCreatePopupComponent, ProjectsUsersComponent],
  providers: [],
})
export class ProjectsModule {}
