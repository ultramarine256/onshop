import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoService} from './info.service';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,

    /// app modules
  ],
  providers: [
    InfoService
  ]
})
export class InfoModule {
}
