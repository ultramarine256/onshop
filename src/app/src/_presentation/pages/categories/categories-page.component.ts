import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryModel, CategoryRepository } from '@data/index';

@Component({
  selector: 'app-categories-page',
  styleUrls: ['./categories-page.component.scss'],
  templateUrl: './categories-page.component.html',
})
export class CategoriesPageComponent implements OnInit {
  public categories$: Observable<CategoryModel[]>;

  constructor(private categoryRepository: CategoryRepository) {}

  ngOnInit(): void {
    this.categories$ = this.categoryRepository.getCategories();
  }
}
