import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseRepository } from '../base.repository';
import { ProductFilter, ProductSearchResult } from './filter';
import { ProductModel, TagModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository extends BaseRepository {
  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getProducts(wpFilter: ProductFilter = new ProductFilter()): Observable<any> {
    return this.httpClient
      .get<ProductSearchResult>(`${this.apiBaseUrl}/wp-json/onshop/v3/product?${wpFilter.asQueryString()}`, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          const products = response.body.map((item) => {
            const product = new ProductModel();
            product.mapFromDto(item);
            return product;
          });

          return new ProductSearchResult({
            items: products,
            totalCount: Number(response.headers.get('X-WP-Total')),
            totalPages: Number(response.headers.get('X-WP-TotalPages')),
          });
        })
      );
  }

  public getTags(): Observable<TagModel[]> {
    return this.httpClient
      .get(`${this.apiBaseUrl}/wp-json/onshop/v3/products/tags`)
      .pipe(map((res: any) => res.filter((dto) => dto.count).map((dto) => new TagModel(dto))));
  }

  public newArrivals(): Observable<Array<ProductModel>> {
    return this.getProducts().pipe(map((r) => r.items));
  }
}
