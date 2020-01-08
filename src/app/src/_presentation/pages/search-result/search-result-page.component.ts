import {Component, OnInit} from '@angular/core';
import {CategoryEntity} from '../../../_core/domain/entities/shop-module';
import {ShopRepository} from '../../../_data/repository/shop';

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
  constructor(private shopApiService: ShopRepository) {
  }

  ngOnInit(): void {
    this.shopApiService.getCategories().subscribe(data => {
      this.categories = data;
      this.isLoaded = true;
    });
  }
}
