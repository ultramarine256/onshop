import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseRepository} from '../base.repository';
import {FilterItem, PricingFilter, ProductFilter, ProductSearchResult, SearchResultFilters} from './filter';
import {ProductModel} from './model';

@Injectable()
export class ProductRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getProducts(wpFilter: ProductFilter = new ProductFilter(), customFilters: string = null): Observable<ProductSearchResult> {
    let url = `${this.apiBaseUrl}/wp-json/onshop/v1/product?${wpFilter.asQueryString()}`;
    if (customFilters) {
      url += `&filter={${customFilters}`;
    }
    return this.httpClient
      .get<ProductSearchResult>(url, {observe: 'response'})
      .pipe(map(response => {
        const body = (response as any).body;

        const items = [];
        for (const dto of body.items as any) {
          const item = new ProductModel();
          item.mapFromDto(dto);
          items.push(item);
        }

        const filters = new SearchResultFilters();
        for (const filterType of body.filters as any) {

          if (filterType.name === 'Price') {
            const pricingFilter = new PricingFilter();
            pricingFilter.name = filterType.name;
            pricingFilter.minPrice = filterType.min;
            pricingFilter.maxPrice = filterType.max;
            filters.price = pricingFilter;

          } else {
            const filterItem = new FilterItem();
            filterItem.name = filterType.name;
            for (const filterItemDto of filterType.filter_items) {
              filterItem.items.push({
                name: filterItemDto.name,
                isChecked: filterItemDto.is_checked,
                count: filterItemDto.count
              });
            }
            filters.filterItems.push(filterItem);
          }
        }
        const result = new ProductSearchResult({
          items,
          filters: filters,
          totalCount: Number(response.headers.get('X-WP-Total')),
          totalPages: Number(response.headers.get('X-WP-TotalPages'))
        });

        return result;
      }));
  }

  public getProducts2(filter): Observable<ProductSearchResult> {
    return this.httpClient
      .get<ProductSearchResult>(`${this.apiBaseUrl}/wp-json/onshop/v1/product${filter}`, {observe: 'response'})
      .pipe(map(response => {

        const body = (response as any).body;

        const items = [];
        for (const dto of body.items as any) {
          const item = new ProductModel();
          item.mapFromDto(dto);
          items.push(item);
        }

        const result = new ProductSearchResult({
          items,
          filters: new SearchResultFilters({
            price: new PricingFilter({
              minPrice: body.filters.min_price,
              maxPrice: body.filters.max_price
            })
          }),
          totalCount: Number(response.headers.get('X-WP-Total')),
          totalPages: Number(response.headers.get('X-WP-TotalPages'))
        });

        return result;
      }));
  }

  public getFiltersProduct(filter) {
    return this.httpClient.get <any>(this.apiBaseUrl + '/wp-json/onshop/v1/product');
  }

  public newArrivals(): Observable<Array<ProductModel>> {
    return this.getProducts().pipe(map(r => r.items));
  }

  public relatedProducts(): Observable<Array<ProductModel>> {
    return this.getProducts().pipe(map(r => r.items));
  }
}
