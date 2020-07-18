import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from '../../../../data';

@Component({
  selector: 'app-category-item',
  styleUrls: ['./category-item.component.scss'],
  templateUrl: './category-item.component.html',
})
export class CategoryItemComponent implements OnInit {
  @Input() category: CategoryModel;

  constructor() {}

  ngOnInit() {}
}
