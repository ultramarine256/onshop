import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CategoryFilter} from './filter';
import {CategoryModel} from './model';

@Injectable()
export class CategoryRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getCategory(id: number): Observable<CategoryModel> {
    return this.httpClient
      .get<Array<CategoryModel>>(`${this.apiBaseUrl}/wp-json/onshop/v1/categories/${id}`)
      .pipe(map(response => {
        const result = new CategoryModel();
        result.mapFromDto(response);
        return result;
      }));
  }

  public getCategories(filter: CategoryFilter = null): Observable<Array<CategoryModel>> {
    return this.httpClient
      .get<Array<CategoryModel>>(`${this.apiBaseUrl}/wp-json/onshop/v1/categories`)
      .pipe(map(response => {
        const result = [];
        for (const dto of response) {
          const item = new CategoryModel();
          item.mapFromDto(dto);
          result.push(item);
        }
        return result;
      }));
  }
}
