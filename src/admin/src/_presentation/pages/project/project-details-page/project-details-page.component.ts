import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AddUser, ProjectEntity, ProjectRepository, UserEntity, UserRepository } from '../../../../_data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, tap } from 'rxjs/operators';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
})
export class ProjectDetailPageComponent extends UnsubscribeMixin() implements OnInit {
  public entity: ProjectEntity = new ProjectEntity();
  public allUsers: UserEntity[];
  public existingUsers: UserEntity[];
  public isProcessing: boolean;
  public didLoaded = false;

  constructor(
    private projectRepository: ProjectRepository,
    private userRepository: UserRepository,
    private route: ActivatedRoute,
    private location: Location,
    private infoMessage: MatSnackBar
  ) {
    super();
  }

  async ngOnInit() {
    this.route.params.subscribe(async (x) => {
      this.didLoaded = true;
      this.entity = await this.projectRepository.getProjectById(x.id).toPromise();
      const items = await this.userRepository.getAllUsers().toPromise();
      const existingItems: AddUser = await this.userRepository.getProjectUsers(x.id).toPromise();
      this.existingUsers = items.filter((item) => existingItems.user_ids.includes(item.id));
      this.allUsers = items.filter((item) => !existingItems.user_ids.includes(item.id));
      this.didLoaded = false;
    });
  }

  async deleteCurrentProject(id: number) {
    if (this.existingUsers.length) {
      this.infoMessage.open('there are still users in the project!', 'Error!', {
        duration: 2000,
      });
      return;
    }
    await this.projectRepository.deleteProject(id).pipe(takeUntil(this.destroy$)).toPromise();
    this.infoMessage.open('Project deleted!', 'ok!', {
      duration: 2000,
    });
    this.location.back();
  }

  public addUser(event) {
    this.isProcessing = true;
    this.userRepository
      .setProjectUsers(this.entity.id, event.id)
      .pipe(
        tap(() => (this.isProcessing = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.allUsers = this.allUsers.filter((x) => x.id !== event.id);
        this.existingUsers = this.existingUsers.concat(event);
        this.infoMessage.open('User added!', 'ok!', {
          duration: 2000,
        });
      });
  }

  public deleteUser(event) {
    this.isProcessing = true;
    this.userRepository
      .deleteProjectUsers(event.id, this.entity.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.existingUsers.concat(event);
        const index = this.existingUsers.indexOf(event);
        if (index >= 0) {
          this.existingUsers = this.existingUsers.filter((x) => x.id !== event.id);
          this.allUsers = this.allUsers.concat(event);
        }
        this.isProcessing = false;
        this.infoMessage.open('User deleted!', 'ok!', {
          duration: 2000,
        });
      });
  }
}
