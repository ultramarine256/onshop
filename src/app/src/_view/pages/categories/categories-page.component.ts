import {Component, Input, OnInit} from '@angular/core';
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
  constructor(private shopRepository: ShopRepository) {
  }

  ngOnInit(): void {
    this.shopRepository.getCategories().subscribe(data => {
      this.categories = data;
      this.isLoaded = true;
    });
  }

  public getSubCategories(id: number, items: Array<CategoryEntity>): Array<CategoryEntity> {
    // TODO: implement method latter
    const result = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].parent === id) {
        result.push(items[i]);
      }
    }
    return result;
  }
}


