import {Component, OnInit} from '@angular/core';
import {ShopRepository} from '../../../_data';
import {CategoryEntity} from '../../../_core';

@Component({
  selector: 'app-categories-page',
  styleUrls: ['./categories-page.component.scss'],
  templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent implements OnInit {
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
