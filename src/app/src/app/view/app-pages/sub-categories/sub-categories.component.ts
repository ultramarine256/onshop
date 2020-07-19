import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UnsubscribeMixin } from '../../../core';
import { CategoryModel, CategoryRepository } from '../../../data';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent extends UnsubscribeMixin() implements OnInit {
  public category$: Observable<CategoryModel>;

  constructor(private activatedRoute: ActivatedRoute, private categoryRepository: CategoryRepository) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const categorySlug = params?.categorySlug;
      this.category$ = this.categoryRepository.categories$.pipe(
        map((categories) => categories.find((category) => category.slug === categorySlug))
      );
    });
  }
}
