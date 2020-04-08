import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AddUser, ProjectEntity, ProjectRepository, UserEntity, UserRepository} from '../../../../_data';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html'
})
export class ProjectDetailPageComponent implements OnInit {
  public entity: ProjectEntity = new ProjectEntity();
  public allUsers: UserEntity[];
  public existingUsers: UserEntity[];
  public isProcessing: boolean;

  constructor(private projectRepository: ProjectRepository,
              private userRepository: UserRepository,
              private route: ActivatedRoute,
              private location: Location) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async x => {
      this.entity = await this.projectRepository.getProjectById(x.id).toPromise();
      const items = await this.userRepository.getAllUsers().toPromise();
      const existingItems: AddUser = await this.userRepository.getProjectUsers(x.id).toPromise();
      this.existingUsers = items.filter(item => existingItems.user_ids.includes(item.id));
      this.allUsers = items.filter(item => !(existingItems.user_ids.includes(item.id)));
    });
  }

  async deleteCurrentProject(id: number) {
    await this.projectRepository.deleteProject(id).toPromise();
    alert('deleted');
    this.location.back();
  }

  public addUser(event) {
    this.isProcessing = true;
    this.userRepository.setProjectUsers(this.entity.id, event.id).subscribe(() => {
      this.isProcessing = false;
      alert('done');
    });
  }

  public deleteUser(event) {
    this.isProcessing = true;
    this.userRepository.deleteProjectUsers(event.id, this.entity.id).subscribe(() => {
      this.isProcessing = false;
      alert('user deleted');
    });
  }

}
