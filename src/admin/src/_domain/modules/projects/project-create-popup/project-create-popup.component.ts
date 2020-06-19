import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { ProjectRepository } from '@data/repository/project';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { throwError } from 'rxjs';

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
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      marketSegment: ['', [Validators.required]],
      code: ['', [Validators.required]],
      address: [''],
      pricingMargin: [''],
      estimatedStartDate: ['', [Validators.required]],
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
        catchError((error) => {
          this.snackBar.open('Project already exist', null, {
            duration: 2000,
          });
          return throwError(error);
        }),
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        this.matDialogRef.close({ ...this.profileForm.value, id: response.id });
      });
  }
}
