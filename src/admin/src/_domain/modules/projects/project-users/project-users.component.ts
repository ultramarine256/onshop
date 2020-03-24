import {Component, Input, OnInit} from '@angular/core';
import {ProjectRepository} from '../../../../_data';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectsUsersComponent implements OnInit {
  // @Input() projectId: number;
  public showAllUsers = false;
  users: Array<User> = [
    {
      id: 1,
      name: 'custumer1',
      lastName: 'customeroff2',
      email: 'customer@gmail.com'
    },
    {
      id: 2,
      name: 'custumer2',
      lastName: 'customeroff2',
      email: 'customer@gmail2.com'
    },
    {
      id: 3,
      name: 'custumer3',
      lastName: 'customeroff3',
      email: 'customer@gmail3.com'
    }
  ];

  allUsers: Array<User> = [
    {
      id: 1,
      name: 'custumer1',
      lastName: 'customeroff2',
      email: 'customer@gmail.com'
    },
    {
      id: 2,
      name: 'custumer2',
      lastName: 'customeroff2',
      email: 'customer@gmail2.com'
    },
    {
      id: 3,
      name: 'custumer3',
      lastName: 'customeroff3',
      email: 'customer@gmail3.com'
    },
    {
      id: 4,
      name: 'custumer1',
      lastName: 'customeroff2',
      email: 'customer@gmail.com'
    },
    {
      id: 5,
      name: 'custumer2',
      lastName: 'customeroff2',
      email: 'customer@gmail2.com'
    },
    {
      id: 6,
      name: 'custumer3',
      lastName: 'customeroff3',
      email: 'customer@gmail3.com'
    }
  ];

  constructor(private projectRepository: ProjectRepository) {
  }

  ngOnInit() {
  }

}

class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}
