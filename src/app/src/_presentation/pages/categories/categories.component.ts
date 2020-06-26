import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryModel, CategoryRepository } from '@data/index';

@Component({
  selector: 'app-categories',
  styleUrls: ['./categories.component.scss'],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  public categories$: Observable<CategoryModel[]>;

  constructor(private categoryRepository: CategoryRepository) {}

  ngOnInit(): void {
    this.categories$ = this.categoryRepository.categories$;
  }
}
