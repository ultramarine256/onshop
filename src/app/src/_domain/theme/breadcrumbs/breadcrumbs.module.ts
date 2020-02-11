import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {BreadcrumbsService} from './breadcrumbs.service';

@NgModule({
  declarations: [
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BreadcrumbsComponent
  ],
  providers: [
    BreadcrumbsService
  ],
  entryComponents: []
})
export class BreadcrumbsModule {
}
