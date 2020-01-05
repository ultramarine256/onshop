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
    /// angular modules
    CommonModule,
    RouterModule,

    /// app modules
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
