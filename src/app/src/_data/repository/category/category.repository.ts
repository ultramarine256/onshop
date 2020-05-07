import { Injectable } from '@angular/core';
import { BaseRepository } from '../base.repository';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryModel } from './model';

@Injectable()
export class CategoryRepository extends BaseRepository {
  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getCategory(id: number): Observable<CategoryModel> {
    return this.httpClient.get<Array<CategoryModel>>(`${this.apiBaseUrl}/wp-json/onshop/v1/categories/${id}`).pipe(
      map((response) => {
        const result = new CategoryModel();
        result.mapFromDto(response);
        return result;
      })
    );
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<Array<CategoryModel>>(`${this.apiBaseUrl}/wp-json/onshop/v1/categories`).pipe(
      map((response) => {
        // associate categories with their parent categoryId
        const nestedCategories = response
          .filter((dto) => dto.parent)
          .reduce((acc, item) => {
            if (!acc[item.parent]) {
              acc[item.parent] = [];
            }
            acc[item.parent] = acc[item.parent].concat(item);
            return acc;
          }, {});
        const nestedCategoriesIds = Object.keys(nestedCategories).map((key) => +key);

        return response
          .filter((dto) => !nestedCategoriesIds.includes(dto.parent)) // if category contains a parentId, then filter it
          .map((dto) => {
            const categoryModel = new CategoryModel();
            categoryModel.mapFromDto(dto);

            // if nestedCategoriesIds contains categoryId then we need to set subCategories for this category
            if (nestedCategoriesIds.includes(dto.id)) {
              categoryModel.subCategories = nestedCategories[dto.id];
            }

            return categoryModel;
          });
      })
    );
  }
}
