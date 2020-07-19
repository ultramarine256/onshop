import { Component, Input } from '@angular/core';
import { CategoryModel } from '../../../../data';

@Component({
  selector: 'app-category-item',
  styleUrls: ['./category-item.component.scss'],
  templateUrl: './category-item.component.html',
})
export class CategoryItemComponent {
  @Input() category: CategoryModel;
}
