import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '@shared/shared.module';

import { ProjectsUsersComponent } from './movable-user-list';
import { ProjectCreatePopupComponent } from './project-create-popup/project-create-popup.component';

@NgModule({
  declarations: [ProjectCreatePopupComponent, ProjectsUsersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [ProjectCreatePopupComponent, ProjectsUsersComponent],
  providers: [],
})
export class ProjectsModule {}
