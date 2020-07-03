import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProjectsModule } from '@domain/index';
import { HomePageComponent } from './home';
import { AppPagesComponent } from './app-pages.component';
import { AppPagesRouting } from './app-pages.routing';
import {ProjectPageComponent } from './project';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppPagesComponent, HomePageComponent, ProjectPageComponent],
  imports: [CommonModule, ProjectsModule, MatDialogModule, MatIconModule, MatButtonModule, AppPagesRouting, MatTableModule, MatMenuModule, MatProgressSpinnerModule],
  exports: [HomePageComponent, AppPagesComponent],
  providers: [],
})
export class AppPagesModule {}
