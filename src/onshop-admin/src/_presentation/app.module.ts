import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home';
import {RepositoryModule} from '../_data/repository';


@NgModule({
  declarations: [
    HomePageComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    RepositoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
