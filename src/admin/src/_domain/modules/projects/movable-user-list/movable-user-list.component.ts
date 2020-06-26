import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserEntity } from '@data/repository';

@Component({
  selector: 'app-project-users',
  templateUrl: './movable-user-list.component.html',
  styleUrls: ['./movable-user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsUsersComponent {
  @Input() existingItems: Array<UserEntity> = [];
  @Input() allItems: Array<UserEntity> = [];
  @Input() isProcessing: boolean;
  @Output() added = new EventEmitter<UserEntity>();
  @Output() deleted = new EventEmitter<UserEntity>();
}
