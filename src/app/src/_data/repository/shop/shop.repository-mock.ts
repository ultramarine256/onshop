import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ShopInfoEntity, CategoryEntity, OrderEntity, ProductEntity} from '../../../_core';
import {CategoryFilter, ProductFilter} from '../_filter';
import {ShopRepositoryMocks} from './mock';

@Injectable()
export class ShopRepository extends BaseRepository {

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
    const shopInfoEntity = new ShopInfoEntity({email: 'asd@mail.com', address: '123'});
    return of(shopInfoEntity);
  }

  /**
   * --------------------------------------------------------------------------
   * Products
   * --------------------------------------------------------------------------
   */

  public getProducts(filter: ProductFilter = null): Observable<Array<ProductEntity>> {
    const products = [];


    return  null;

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
    const categories = [
      new CategoryEntity({id: 1, name: 'category 1', slug: 'slug-1', description: 'desc desc desc'}),
      new CategoryEntity({id: 2, name: 'category 2', slug: 'slug-2', description: 'desc desc desc'}),
      new CategoryEntity({id: 3, name: 'category 3', slug: 'slug-3', description: 'desc desc desc'})
    ];

    return of(categories);
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

  public placeOrder(entity: OrderEntity): Observable<any> {
    return this.httpClient
      .post<CategoryEntity>(`${this.apiBaseUrl}/wp-json/onshop/v1/order`, entity.asWooObject());
  }
}
