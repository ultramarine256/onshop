import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ShopInfoEntity, CategoryEntity, OrderEntity, ProductEntity, ProductCategory, ProductImage} from '../../../_core';
import {CategoryFilter, ProductFilter} from '../_filter';
import {map} from 'rxjs/operators';
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
    const shopInfoEntity = new ShopInfoEntity({
      appTitle: 'OnShop',
      themeColor: '#007bff',
      logoImageUrl: 'https://onshopprod.blob.core.windows.net/blue-shop/assets/blue-shop-logo.svg',
      email: 'asd@mail.com',
      address: '123',
      phone: '(044) 333 22 11'
    });
    return of(shopInfoEntity);
  }

  /**
   * --------------------------------------------------------------------------
   * Products
   * --------------------------------------------------------------------------
   */

  public getProducts(filterArg: ProductFilter = null): Observable<Array<ProductEntity>> {
    return of(ShopRepositoryMocks.Products());
  }

  public newArrivals(): Observable<Array<ProductEntity>> {
    return this.getProducts();
  }

  public getProductBySlug(slug: string): Observable<ProductEntity> {
    return this.getProducts()
      .pipe(map(results => results.find(r => r.slug === slug)))
      .pipe(map(x => {
        const result = new ProductEntity();
        result.mapFromDto(x);
        return result;
      }));
  }

  /**
   * --------------------------------------------------------------------------
   * Categories
   * --------------------------------------------------------------------------
   */

  public getCategories(filterArg: CategoryFilter = null): Observable<Array<CategoryEntity>> {
    return of(ShopRepositoryMocks.Categories());
  }

  public getCategoryBySlug(slug: string): Observable<CategoryEntity> {
    return this.getCategories()
      .pipe(map(results => results.find(r => r.slug === slug)))
      .pipe(map(x => {
        const result = new CategoryEntity();
        result.mapFromDto(x);
        return result;
      }));
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
