import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects';
import { ThirdPartyModule } from '@domain/modules/_theme/_third-party';

@NgModule({
  declarations: [OrdersComponent, ProjectsComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, ThirdPartyModule],
  exports: [OrdersComponent, ProjectsComponent],
})
export class ProfileModule {}
