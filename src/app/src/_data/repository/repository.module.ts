import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductRepository } from './product';
import { UserRepository } from './user';
import { AppRepository } from './app';
import { CategoryRepository } from './category';
import { OrderRepository } from './order';
import { ProjectRepository } from './project';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [AppRepository, CategoryRepository, OrderRepository, ProductRepository, ProjectRepository, UserRepository],
})
export class RepositoryModule {}
