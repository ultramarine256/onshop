import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home';
import {RepositoryModule} from '../_data/repository';
import {AppRoutingModule} from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    RepositoryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
