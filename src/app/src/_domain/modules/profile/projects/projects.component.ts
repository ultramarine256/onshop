import { Component, Input } from '@angular/core';
import { ProjectResponse } from '../../../../_data/repository/project/model';

@Component({
  selector: 'app-projects-component',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  @Input() items: Array<ProjectResponse>;
  public orders: Array<any> = []; // TODO: add type

  constructor() {
    // @ts-ignore
    this.orders = [
      {
        id: 386,
        status: 'pending',
        currency: 'USD',
        total: '160.00',
        billing: {
          first_name: 'Demo',
          last_name: 'Manager',
          company: '',
          address_1: '',
          address_2: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
          email: 'leevg@yandex.ru',
          phone: '+380983334256',
        },
        shipping: {
          first_name: 'Demo',
          last_name: 'Manager',
          company: '',
          address_1: 'aviatsyiniy lane 18, cherkassy',
          address_2: '',
          city: 'Cherkassy',
          state: 'Cherkasy Oblast',
          postcode: '18003',
          country: '',
        },
      },
    ];
  }
}
