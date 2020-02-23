import {Component, OnInit} from '@angular/core';
import {CategoryModel, CategoryRepository} from '../../../_data';

@Component({
  selector: 'app-search-result-page',
  styleUrls: ['./search-result-page.component.scss'],
  templateUrl: './search-result-page.component.html'
})
export class SearchResultPageComponent implements OnInit {
  /// fields
  public categories: Array<CategoryModel> = [];

  /// predicates
  public isLoaded = false;

  /// constructor
  constructor(private productRepository: CategoryRepository) {
  }

  ngOnInit(): void {
    this.productRepository.getCategories().subscribe(data => {
      this.categories = data;
      this.isLoaded = true;
    });
  }
}
