import {Component, OnInit} from '@angular/core';
import {CategoryModel, CategoryRepository, ProductRepository} from '../../../_data';

@Component({
  selector: 'app-categories-page',
  styleUrls: ['./categories-page.component.scss'],
  templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent implements OnInit {
  /// fields
  public categories: Array<CategoryModel> = [];

  /// predicates
  public isLoaded = false;

  /// constructor
  constructor(private categoryRepository: CategoryRepository) {
  }

  ngOnInit(): void {
    this.categoryRepository.getCategories().subscribe(data => {
      this.categories = data;
      this.isLoaded = true;
    });
  }

  public getSubCategories(id: number, items: Array<CategoryModel>): Array<CategoryModel> {
    const result = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].parent === id) {
        result.push(items[i]);
      }
    }
    return result;
  }
}
