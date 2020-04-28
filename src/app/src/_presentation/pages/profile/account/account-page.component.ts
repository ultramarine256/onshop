import {Component} from '@angular/core';
import {UserModel, UserRepository} from '../../../../_data';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent {
  /// fields
  public item: UserModel;

  // predicates
  public didLoaded = false;
  public editUser = false;

  /// constructor
  constructor(public userRepository: UserRepository) {
    this.userRepository.getUser()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((item: UserModel) => this.item = item);
  }
}
