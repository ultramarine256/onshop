import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectRepository} from './project';
import {HttpClientModule} from '@angular/common/http';
import {UserRepository} from './user';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProjectRepository,
    UserRepository
  ]
})
export class RepositoryModule {
}
