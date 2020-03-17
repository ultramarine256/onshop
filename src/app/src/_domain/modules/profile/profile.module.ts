import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from './orders';
import {RouterModule} from '@angular/router';
import {ProjectsComponent} from './projects';

@NgModule({
  declarations: [
    OrdersComponent,
    ProjectsComponent
  ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
  exports: [
    OrdersComponent,
    ProjectsComponent
  ]
})
export class ProfileModule {
}
