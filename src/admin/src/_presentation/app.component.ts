import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {RepositoryConfigurator} from '../_data/repository';
import {TokenConfigurator} from '../_domain/services/token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'onshop-admin';

  constructor() {
    RepositoryConfigurator.Instance.apiBaseUrl = `${environment.apiBaseUrl}`;
    RepositoryConfigurator.Instance.token = `${environment.apiBaseUrl}`;
    const token = this.getQueryVariable('token', window.location.search.substring(1));
    const a = new TokenConfigurator();
    if (token) {
      a.setToken(token);
    }
    RepositoryConfigurator.Instance.token = a.getToken();
  }

  private getQueryVariable(variable: string, query: string) {
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }
}
