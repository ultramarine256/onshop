import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRepository } from '@data/repository';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show-popup.component.html',
  styleUrls: ['./project-show-popup.component.scss'],
})
export class ProjectShowPopupComponent {
  constructor(private userRepository: UserRepository, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
