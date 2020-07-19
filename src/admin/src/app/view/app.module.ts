import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RepositoryModule } from '../data';

@NgModule({
  declarations: [AppComponent],
  imports: [
    /// angular
    BrowserModule,
    BrowserAnimationsModule,

    /// data
    RepositoryModule,

    /// routing
    AppRoutingModule,
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
})
export class AppModule {}
