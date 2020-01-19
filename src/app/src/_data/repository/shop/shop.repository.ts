import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategoryEntity, OrderEntity, ProductEntity, ShopInfoEntity} from '../../../_core';
import {BaseRepository} from '../base.repository';
import {CategoryFilter, ProductFilter} from '../_filter';

@Injectable()
export class ShopRepositoryReal extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * --------------------------------------------------------------------------
   * Shop Info
   * --------------------------------------------------------------------------
   */

  public getShopInfo(): Observable<ShopInfoEntity> {
    return this.httpClient
      .get<ShopInfoEntity>(`${this.apiBaseUrl}/wp-json/app/info`)
      .pipe(map(x => {
        const result = new ShopInfoEntity();
        result.mapFromDto(x);
        return result;
      }));
  }

  /**
   * --------------------------------------------------------------------------
   * Products
   * --------------------------------------------------------------------------
   */

  public getProducts(filter: ProductFilter = null): Observable<Array<ProductEntity>> {
    return this.httpClient
      .get<Array<ProductEntity>>(`${this.apiBaseUrl}/product`);
  }

  public getProductById(id: number): Observable<ProductEntity> {
    return this.httpClient
      .get<ProductEntity>(`${this.apiBaseUrl}/product/${id}`);
  }

  /**
   * --------------------------------------------------------------------------
   * Categories
   * --------------------------------------------------------------------------
   */

  public getCategories(filter: CategoryFilter = null): Observable<Array<CategoryEntity>> {
    const query = ``;
    return this.httpClient
      .get<Array<CategoryEntity>>(`${this.apiBaseUrl}/category`)
      .pipe(map(responce => {
        const result = [];
        for (const dto of responce) {
          const item = new CategoryEntity();
          item.mapFromDto(dto);
          result.push(item);
        }
        return result;
      }));
  }

  public getCategoryBySlug(slug: string): Observable<CategoryEntity> {
    return this.httpClient
      .get<CategoryEntity>(`${this.apiBaseUrl}/category?slug=${slug}`);
  }

  /**
   * --------------------------------------------------------------------------
   * Order
   * --------------------------------------------------------------------------
   */

  public placeOrder(entity: OrderEntity): Observable<boolean> {
    return null;
  }
}
