import {Component, OnInit} from '@angular/core';
import {ShopRepository, CategoryEntity} from '../../../_data';

@Component({
  selector: 'app-search-result-page',
  styleUrls: ['./search-result-page.component.scss'],
  templateUrl: './search-result-page.component.html'
})
export class SearchResultPageComponent implements OnInit {
  /// fields
  public categories: Array<CategoryEntity> = [];

  /// predicates
  public isLoaded = false;

  /// constructor
  constructor(private shopRepository: ShopRepository) {
  }

  ngOnInit(): void {
    this.shopRepository.getCategories().subscribe(data => {
      this.categories = data;
      this.isLoaded = true;
    });
  }
}
