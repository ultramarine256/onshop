import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProjectRepository} from '../../../../_data/repository/project';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectsAddComponent implements OnInit {
  @Output() formDone = new EventEmitter<boolean>();
  @Output() formDoneValue = new EventEmitter<FormGroup>();
  profileForm: FormGroup;

  constructor(private projectRepository: ProjectRepository) {
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.projectRepository.addProject(this.profileForm.value).subscribe(() => {
      alert('Project added!');
      this.formDone.emit(false);
      this.formDoneValue.emit(this.profileForm.value)
    });
  }
}
