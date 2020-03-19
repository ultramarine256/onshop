import { Component } from '@angular/core';
import {environment} from '../environments/environment';
import {RepositoryConfigurator} from '../_data/repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'onshop-admin';

  constructor() {
    RepositoryConfigurator.Instance.apiBaseUrl = `${environment.apiBaseUrl}`;
  }

}
