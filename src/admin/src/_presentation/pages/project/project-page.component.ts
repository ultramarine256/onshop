import { Component, OnInit } from '@angular/core';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProjectRepository, ProjectEntity } from '@data/index';
import { ProjectCreatePopupComponent } from '@domain/modules/projects/project-create-popup/project-create-popup.component';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent extends UnsubscribeMixin() implements OnInit {
  isLoading: boolean;

  projects: ProjectEntity[];

  constructor(private dialog: MatDialog, private router: Router, private projectRepository: ProjectRepository) {
    super();
  }

  ngOnInit() {
    this.isLoading = true;
    this.projectRepository
      .getProjects()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((items) => (this.projects = items));
  }

  openProjectCreatePopup() {
    const dialogRef = this.dialog.open(ProjectCreatePopupComponent, {
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => data),
        takeUntil(this.destroy$)
      )
      .subscribe((project: ProjectEntity) => {
        this.projects = this.projects.concat(project);
      });
  }
}
