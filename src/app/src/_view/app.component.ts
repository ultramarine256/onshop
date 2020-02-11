import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {RepositoryConfigurator} from '../_data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  /// constructor
  constructor() {
    RepositoryConfigurator.Instance.apiBaseUrl = `${environment.apiBaseUrl}`;
  }
}
