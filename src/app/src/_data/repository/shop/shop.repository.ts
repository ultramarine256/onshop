import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseRepository} from '../base.repository';
import {CategoryFilter, ProductFilter} from '../_filter';
import {CategoryEntity, ProductEntity, ResponseOrderModel, ShopInfoEntity} from '../_model';
import {InventorySearchResult} from '../_model/inventory-search.result';

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

  // public getShopInfo(): Observable<ShopInfoEntity> {
  //   return this.httpClient
  //     .get<ShopInfoEntity>(`${this.apiBaseUrl}/wp-json/app/info`)
  //     .pipe(map(x => {
  //       const result = new ShopInfoEntity();
  //       result.mapFromDto(x);
  //       return result;
  //     }));
  // }

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
   * Categories
   * --------------------------------------------------------------------------
   */

  public getCategory(id: number): Observable<CategoryEntity> {
    return this.httpClient
      .get<Array<CategoryEntity>>(`${this.apiBaseUrl}/wp-json/onshop/v1/categories/${id}`)
      .pipe(map(response => {
        const result = new CategoryEntity();
        result.mapFromDto(response);
        return result;
      }));
  }

  public getCategories(filter: CategoryFilter = null): Observable<Array<CategoryEntity>> {
    return this.httpClient
      .get<Array<CategoryEntity>>(`${this.apiBaseUrl}/wp-json/onshop/v1/categories`)
      .pipe(map(response => {
        const result = [];
        for (const dto of response) {
          const item = new CategoryEntity();
          item.mapFromDto(dto);
          result.push(item);
        }
        return result;
      }));
  }

  /**
   * --------------------------------------------------------------------------
   * Products
   * --------------------------------------------------------------------------
   */

  public getProducts(filter: ProductFilter = null): Observable<InventorySearchResult> {
    return this.httpClient
      .get<InventorySearchResult>(`${this.apiBaseUrl}/wp-json/onshop/v1/product?${filter.asQueryString()}`, {observe: 'response'})
      .pipe(map(response => {


        debugger;
        const items = [];
        for (const dto of response.body as any) {
          const item = new ProductEntity();
          item.mapFromDto(dto);
          items.push(item);
        }


        return new InventorySearchResult({
          items,
          totalCount: Number(response.headers.get('X-WP-Total')),
          totalPages: Number(response.headers.get('X-WP-TotalPages'))
        });
      }));
  }

  public getProductBySlug(slug: string): Observable<ProductEntity> {
    return this.httpClient
      .get<Array<CategoryEntity>>(`${this.apiBaseUrl}/wp-json/onshop/v1/product?slug=${slug}`)
      .pipe(map(results => results.find(r => r.slug === slug)))
      .pipe(map(x => {
        const result = new ProductEntity();
        result.mapFromDto(x);
        return result;
      }));
  }

  public newArrivals(): Observable<Array<ProductEntity>> {
    return this.httpClient
      .get<Array<CategoryEntity>>(`${this.apiBaseUrl}/wp-json/onshop/v1/product`)
      .pipe(map(response => {
        const result = [];
        for (const dto of response) {
          const item = new ProductEntity();
          item.mapFromDto(dto);
          result.push(item);
        }
        return result;
      }));
  }

  /**
   * --------------------------------------------------------------------------
   * Order
   * --------------------------------------------------------------------------
   */

  public placeOrder(woocommerceOrder: {}): Observable<ResponseOrderModel> {
    return this.httpClient
      .post<CategoryEntity>(`${this.apiBaseUrl}/wp-json/onshop/v1/order`, woocommerceOrder)
      .pipe(map(dto => {
        const model = new ResponseOrderModel();
        model.mapFromWooDto(dto);
        return model;
      }));
  }
}
