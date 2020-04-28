import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProjectRepository} from '../../../../_data/repository/project';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-create.component.html',
  styles: [`
    .form-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.25);
      display: flex;
      justify-content: center;
      z-index: 3;
    }

    .form-creation {
      width: 50%;
      height: 70vh;
    }
  `]
})
export class ProjectsAddComponent {
  @Output() formDone = new EventEmitter<boolean>();
  @Output() formDoneValue = new EventEmitter<FormGroup>();
  profileForm: FormGroup;
  public formSubmit: boolean;

  constructor(private projectRepository: ProjectRepository) {
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    this.formSubmit = true;
    this.projectRepository.addProject(this.profileForm.value).subscribe(() => {
      this.formDone.emit(false);
      this.formDoneValue.emit(this.profileForm.value);
      alert('Project added!');
      this.formSubmit = false;
    });
  }
}
