import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseRepository} from '../base.repository';
import {PricingFilter, ProductFilter, ProductSearchResult, SearchResultFilters} from './filter';
import {ProductModel} from './model';

@Injectable()
export class ProductRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getProducts(filter: ProductFilter = new ProductFilter()): Observable<ProductSearchResult> {
    return this.httpClient
      .get<ProductSearchResult>(`${this.apiBaseUrl}/wp-json/onshop/v1/product?${filter.asQueryString()}`, {observe: 'response'})
      .pipe(map(response => {

        const items = [];
        for (const dto of response.body.items as any) {
          const item = new ProductModel();
          item.mapFromDto(dto);
          items.push(item);
        }

        const result = new ProductSearchResult({
          items,
          filters: new SearchResultFilters({
            price: new PricingFilter({
              minPrice: (response as any).body.filters.min_price,
              maxPrice: (response as any).body.filters.max_price
            })
          }),
          totalCount: Number(response.headers.get('X-WP-Total')),
          totalPages: Number(response.headers.get('X-WP-TotalPages'))
        });

        return result;
      }));
  }

  public newArrivals(): Observable<Array<ProductModel>> {
    return this.getProducts().pipe(map(r => r.items));
  }

  public relatedProducts(): Observable<Array<ProductModel>> {
    return this.getProducts().pipe(map(r => r.items));
  }
}
