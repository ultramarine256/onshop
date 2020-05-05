import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { ProjectEntity, ProjectRepository } from '@data/repository/project';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-create-popup.component.html',
  styleUrls: ['./project-create-popup.component.scss'],
})
export class ProjectCreatePopupComponent extends UnsubscribeMixin() implements OnInit {
  isLoading: boolean;

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectRepository: ProjectRepository,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<ProjectCreatePopupComponent>
  ) {
    super();
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.snackBar.open('Form is invalid', null, {
        duration: 2000,
      });
      return false;
    }
    this.isLoading = true;
    this.projectRepository
      .addProject(this.profileForm.value)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const entity = new ProjectEntity();
        const model = entity.mapFromDto({ ...this.profileForm.value });
        this.matDialogRef.close(model);
      });
  }
}
