import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseRepository } from '../base.repository';
import { FilterItem, PricingFilter, ProductFilter, ProductSearchResult, SearchResultFilters } from './filter';
import { ProductModel } from './model';

@Injectable()
export class ProductRepository extends BaseRepository {
  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getProducts(
    wpFilter: ProductFilter = new ProductFilter(),
    customFilters: string = null
  ): Observable<ProductSearchResult> {
    let url = `${this.apiBaseUrl}/wp-json/onshop/v1/product?${wpFilter.asQueryString()}`;
    if (customFilters) {
      url += `&filter={${customFilters}`;
    }
    return this.httpClient
      .get<ProductSearchResult>(url, { observe: 'response' })
      .pipe(
        map((response) => {
          const body = (response as any).body;

          const items = [];
          for (const dto of body.items as any) {
            const item = new ProductModel();
            item.mapFromDto(dto);
            items.push(item);
          }

          const filters = new SearchResultFilters();
          for (const filteritem in body.filters) {
            const name = body.filters[filteritem].name;
            if (name === 'Price') {
              const pricingFilter = new PricingFilter();
              pricingFilter.name = body.filters[filteritem].name;
              pricingFilter.minPrice = body.filters[filteritem].min;
              pricingFilter.maxPrice = body.filters[filteritem].max;
              filters.price = pricingFilter;
            } else {
              const filterItem = new FilterItem();
              filterItem.name = name;

              for (const filterItemDto in body.filters[filteritem].filter_items) {
                filterItem.items.push({
                  name: body.filters[filteritem].filter_items[filterItemDto].name,
                  isChecked: body.filters[filteritem].filter_items[filterItemDto].is_checked,
                  count: body.filters[filteritem].filter_items[filterItemDto].count,
                });
              }
              filters.filterItems.push(filterItem);
            }
          }
          const result = new ProductSearchResult({
            items,
            filters: filters,
            totalCount: Number(response.headers.get('X-WP-Total')),
            totalPages: Number(response.headers.get('X-WP-TotalPages')),
          });
          return result;
        })
      );
  }

  public getFiltersProduct() {
    return this.httpClient.get<any>(this.apiBaseUrl + '/wp-json/onshop/v1/product');
  }

  public newArrivals(): Observable<Array<ProductModel>> {
    return this.getProducts().pipe(map((r) => r.items));
  }
}
