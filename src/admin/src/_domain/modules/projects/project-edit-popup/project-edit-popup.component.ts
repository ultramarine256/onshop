import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { ProjectRepository, UserEntity, UserRepository } from '@data/repository';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit-popup.component.html',
  styleUrls: ['./project-edit-popup.component.scss'],
})
export class ProjectEditPopupComponent extends UnsubscribeMixin() implements OnInit {
  public allUsers: UserEntity[];
  public existingUsers: UserEntity[];
  public usersDidLoaded = false;
  public isLoading: boolean;
  public isProcessing: boolean;

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectRepository: ProjectRepository,
    private snackBar: MatSnackBar,
    public matDialogRef: MatDialogRef<ProjectEditPopupComponent>,
    private userRepository: UserRepository,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit(): void {
    forkJoin([this.userRepository.getAllUsers(), this.userRepository.getProjectUsers(this.data.project.id)])
      .pipe(
        tap(() => {
          this.usersDidLoaded = true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(([allUsers, existUsers]) => {
        this.existingUsers = allUsers.filter((unique) => existUsers.user_ids.includes(unique.id));
        this.allUsers = allUsers.filter((unique) => !existUsers.user_ids.includes(unique.id));
      });
    this.profileForm = this.fb.group({
      id: [this.data.project.id, [Validators.required]],
      name: [this.data.project.name, [Validators.required]],
      description: [this.data.project.description, [Validators.required]],
      marketSegment: [this.data.project.marketSegment, [Validators.required]],
      code: [this.data.project.code, [Validators.required]],
      address: [this.data.project.address],
      pricingMargin: [this.data.project.pricingMargin],
      estimatedStartDate: [this.data.project.estimatedStartDate, [Validators.required]],
    });
  }

  public addUser(event) {
    this.isProcessing = true;
    this.userRepository
      .setProjectUsers(this.data.project.id, event.id)
      .pipe(
        tap(() => (this.isProcessing = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.allUsers = this.allUsers.filter((x) => x.id !== event.id);
        this.existingUsers = this.existingUsers.concat(event);
        this.snackBar.open('User added', null, {
          duration: 2000,
        });
      });
  }

  public deleteUser(event) {
    this.isProcessing = true;
    this.userRepository
      .deleteProjectUsers(event.id, this.data.project.id)
      .pipe(
        tap(() => {
          this.isProcessing = false;
          this.snackBar.open('User deleted', null, {
            duration: 2000,
          });
        }, takeUntil(this.destroy$))
      )
      .subscribe(() => {
        this.existingUsers.concat(event);
        const index = this.existingUsers.indexOf(event);
        if (index >= 0) {
          this.existingUsers = this.existingUsers.filter((x) => x.id !== event.id);
          this.allUsers = this.allUsers.concat(event);
        }
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
      .editProject(this.profileForm.value)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((response: any) => {
        this.matDialogRef.close({ ...this.profileForm.value });
      });
  }
}
