import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseWooApiService} from '../base-woo-api.service';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategoryEntity, OrderEntity, ProductEntity} from '../../../entities';
import {ApiResponse} from './response';

@Injectable()
export class ShopApiService extends BaseWooApiService {

  constructor(httpClient: HttpClient) {
    super();
  }

  /// products
  public getProducts(params: any = null): Observable<ApiResponse> {

    if (!params) {
      params = {};
      params.per_page = 21;
    }

    const promise = this.wooRestApi.get('products', params);

    return from(promise)
      .pipe(map((x: any) => {
        const result = new ApiResponse();
        result.items = ProductEntity.mapFromMany(x.data);
        result.totalCount = 0;
        return result;
      }));
  }

  public getProductById(id: number): Observable<ProductEntity> {
    const promise = this.wooRestApi.get(`products/${id}`, {});
    return from(promise)
      .pipe(map((x: any) => {
        const result = new ProductEntity();
        result.mapFromDto(x.data);
        return result;
      }));
  }

  /// categories
  public getCategories(): Observable<Array<CategoryEntity>> {
    const promise = this.wooRestApi.get('products/categories', {});
    return from(promise)
      .pipe(map((x: any) => {
        const result = [];
        for (const dto of x.data) {
          const entity = new CategoryEntity();
          entity.mapFromDto(dto);
          result.push(entity);
        }
        return result;
      }));
  }

  /// order
  public createOrder(entity: OrderEntity): Observable<ApiResponse> {
    const promise = this.wooRestApi.post(`orders`, {});

    return null;

    // return from(promise)
    //   .pipe(map((x: any) => {
    //     const result = new ProductEntity();
    //     result.mapFromDto(x.data);
    //     return result;
    //   }));
  }
}
