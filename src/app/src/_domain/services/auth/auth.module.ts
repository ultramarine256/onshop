import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    /// angular modules
    CommonModule,

    /// app modules
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
