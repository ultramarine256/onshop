import {Component, Input, OnInit} from '@angular/core';
import {ProjectRepository, UserEntity, UserRepository} from '../../../../_data';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectsUsersComponent implements OnInit {
  @Input() projectId: number;

  public showAllUsers = false;
  private userResponse: boolean;
  public users: Array<UserEntity> = [];
  public projectUsersId: any;
  public projectUsers: Array<UserEntity> = [];

  constructor(private userRepository: UserRepository) {
  }

  ngOnInit() {
    if (this.projectId) {
      this.userRepository.getUsers().subscribe(res => {
        this.users.push(res);
        this.userResponse = true;
      });
      this.userRepository.getProjectUsers(this.projectId).subscribe(items => {
        this.projectUsersId = items;
        if (this.userResponse) {
          this._setProjectUsers(this.users, this.projectUsersId);
        }
      });
    }
  }

  _setProjectUsers(allUsers: Array<UserEntity>, UsersId) {
    const arr = allUsers.slice();
    for (let i = 0; i < allUsers.length; i++) {
      for (const id of UsersId.user_ids) {
        if (allUsers[i] && allUsers[i].id === id) {
          this.projectUsers.push(allUsers[i]);
          const index = arr.indexOf(allUsers[i]);
          arr.splice(index, 1);
        }
      }
    }
    this.users = arr;
  }

  deleteFromProject(user, id: number) {
    this.projectUsers.splice(id, 1);
    this.users.push(user);
  }

  addProjectUser(user: UserEntity, id: number) {
    this.userRepository.setProjectUsers(this.projectId, user.id).subscribe(() => alert('User added!'));
    this.users.splice(id, 1);
    this.projectUsers.push(user);
  }
}

class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}


