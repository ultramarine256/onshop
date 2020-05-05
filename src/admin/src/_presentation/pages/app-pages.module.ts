import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsModule } from '../../_domain';
import { HomePageComponent } from './home';
import { AppPagesComponent } from './app-pages.component';
import { AppPagesRouting } from './app-pages.routing';
import { ProjectDetailPageComponent, ProjectPageComponent } from './project';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppPagesComponent, HomePageComponent, ProjectPageComponent, ProjectDetailPageComponent],
  imports: [
    CommonModule,

    ProjectsModule,
    MatDialogModule,
    MatIconModule,

    // app-routing
    AppPagesRouting,
    MatButtonModule,
  ],
  exports: [HomePageComponent, AppPagesComponent],
  providers: [],
})
export class AppPagesModule {}
