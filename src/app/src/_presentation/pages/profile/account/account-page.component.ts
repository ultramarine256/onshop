import {Component} from '@angular/core';
import {UserModel, UserRepository} from '../../../../_data';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent {
  /// fields
  public items: UserModel;

  // predicates
  public didLoaded = false;

  /// constructor
  constructor(public userRepository: UserRepository) {
    this.userRepository.getUser()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: UserModel) => this.items = items);
  }
}
