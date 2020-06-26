import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEntity, UserRepository } from '@data/repository';
import { forkJoin } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show-popup.component.html',
  styleUrls: ['./project-show-popup.component.scss'],
})
export class ProjectShowPopupComponent extends UnsubscribeMixin() implements OnInit {
  public existingUsers: UserEntity[];
  public usersDidLoaded = false;

  constructor(private userRepository: UserRepository, @Inject(MAT_DIALOG_DATA) public data: any) {
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
      });
  }
}
