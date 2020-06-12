import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CategoryModel } from './model';
import { BaseRepository } from '../base.repository';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepository extends BaseRepository {
  public categoriesSubject = new ReplaySubject<CategoryModel[]>(1);
  public categories$ = this.categoriesSubject.asObservable();

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<Array<CategoryModel>>(`${this.apiBaseUrl}/wp-json/onshop/v3/categories`).pipe(
      map((response) => {
        // associate categories with their parent categoryId
        const nestedCategories = response
          .filter((dto) => dto.parent)
          .reduce((acc, dto) => {
            if (!acc[dto.parent]) {
              acc[dto.parent] = [];
            }
            const categoryModel = new CategoryModel();
            categoryModel.mapFromDto(dto);
            acc[dto.parent] = acc[dto.parent].concat(categoryModel);
            return acc;
          }, {});
        const nestedCategoriesIds = Object.keys(nestedCategories).map((key) => +key);

        return (
          response
            // if category contains a parentId, then filter it, and category has some products
            .filter((dto) => !nestedCategoriesIds.includes(dto.parent) && dto.count && dto.slug !== 'uncategorized')
            .map((dto) => {
              const categoryModel = new CategoryModel();
              categoryModel.mapFromDto(dto);

              // if nestedCategoriesIds contains categoryId then we need to set subCategories for this category
              if (nestedCategoriesIds.includes(dto.id)) {
                categoryModel.subCategories = nestedCategories[dto.id];
              }
              return categoryModel;
            })
        );
      }),
      tap((categories) => {
        const categoryAll = new CategoryModel();
        categoryAll.mapFromDto({
          id: null,
          name: 'All',
          image: {
            externalPath: true,
            src: 'https://ndwesti.ru/wp-content/uploads/2019/03/pochemu-vygodno-brat-instrument-v-prokat-1.jpg',
          },
        });
        categories.unshift(categoryAll);
        this.categoriesSubject.next(categories);
      })
    );
  }
}
