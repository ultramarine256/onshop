import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserEntity, UserRepository} from '../../../../_data';

@Component({
  selector: 'app-project-users',
  templateUrl: './movable-user-list.component.html',
  styleUrls: ['./movable-user-list.component.scss']
})
export class ProjectsUsersComponent {
  @Input() existingItems: Array<UserEntity> = [];
  @Input() allItems: Array<UserEntity> = [];
  @Input() isProcessing: boolean;
  @Output() added = new EventEmitter<UserEntity>();
  @Output() deleted = new EventEmitter<UserEntity>();

  public add(item: UserEntity, items: Array<UserEntity>) {
    const index = items.indexOf(item);
    if (index === -1) {
      items.push(item);
    }
  }

  public delete(item: UserEntity, items: Array<UserEntity>) {
    const index = items.indexOf(item);
    if (index >= 0) {
      items.splice(index, 1);
    }
  }
}
