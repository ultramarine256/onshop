import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';

import { ProjectsUsersComponent } from '../../modules/projects/movable-user-list/movable-user-list.component';
import { ProjectCreatePopupComponent } from './project-create-popup/project-create-popup.component';
import { ProjectEditPopupComponent } from './project-edit-popup/project-edit-popup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { ProjectShowPopupComponent } from '@domain/modules/projects/project-show-popup/project-show-popup.component';

@NgModule({
  declarations: [ProjectCreatePopupComponent, ProjectEditPopupComponent, ProjectShowPopupComponent, ProjectsUsersComponent],
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
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
  ],
  exports: [ProjectCreatePopupComponent, ProjectEditPopupComponent, ProjectShowPopupComponent, ProjectsUsersComponent],
  providers: [],
})
export class ProjectsModule {}
