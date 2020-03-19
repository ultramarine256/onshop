import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectRepository} from './project';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProjectRepository

  ]
})
export class RepositoryModule {
}
