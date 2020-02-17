import {Component, Input, OnInit} from '@angular/core';
import {CategoryEntity} from '../../../../_core';

@Component({
  selector: 'app-category-item',
  styleUrls: ['./category-item.component.scss'],
  templateUrl: './category-item.component.html'
})
export class CategoryItemComponent implements OnInit {
  /// binding
  @Input() id: number;
  @Input() title: string;
  @Input() url: string;
  @Input() count: number;
  @Input() photo;
  @Input() subCategories: Array<CategoryEntity>;


  /// fields
  public categories: Array<CategoryEntity> = [];

  /// constructor
  constructor() {
  }

  ngOnInit() {

  }
}
