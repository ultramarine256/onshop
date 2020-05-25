import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel, UserRepository } from '@data/repository';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
})
export class AccountPageComponent implements OnInit {
  public edit: boolean;
  public element: HTMLElement;

  public user$: Observable<UserModel>;

  constructor(public userRepository: UserRepository) {}

  ngOnInit() {
    this.user$ = this.userRepository.getUser();
  }

  closeEditForm(value) {
    this.edit = value;
  }
}
