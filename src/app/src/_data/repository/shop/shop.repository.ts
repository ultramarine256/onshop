import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseWooRepository} from '../base-woo.repository';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponse, WooResponse} from './response';
import {CategoryEntity, OrderEntity, ProductEntity} from '../../../_core';

@Injectable()
export class ShopRepository extends BaseWooRepository {
  constructor(httpClient: HttpClient) {
    super();
  }

  /// products
  public getProducts(params: any = null): Observable<ApiResponse> {
    if (!params) {
      params = {};
      params.per_page = 20;
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

  public getCategory(slug: string): Observable<CategoryEntity> {
    const promise = this.wooRestApi.get(`products/categories?slug=${slug}`, {});
    return from(promise)
      .pipe(map((x: WooResponse<CategoryEntity>) => {
        if (x.data.length > 0) {
          const result = new CategoryEntity();
          result.mapFromDto(x.data[0]);
          return result;
        }
        return null;
      }));
  }

  /// order
  public placeOrder(entity: OrderEntity): Observable<any> {

    this.wooRestApi.post('orders', {
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
      set_paid: false,
      line_items: [
        {
          product_id: 93,
          quantity: 2
        },
        {
          product_id: 22,
          quantity: 1
        }
      ]
    })
      .then((response) => {
        // Successful request
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
        console.log('Response Data:', response.data);
      })
      .catch((error) => {
        // Invalid request, for 4xx and 5xx statuses
        console.log('Response Status:', error.response.status);
        console.log('Response Headers:', error.response.headers);
        console.log('Response Data:', error.response.data);
      })
      .finally(() => {
        // Always executed.
      });

    return null;
  }


  public test() {
    this.wooRestApi.post('products', {
      name: 'Premium Quality', // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
      type: 'simple',
      regular_price: '21.99',
    })
      .then((response) => {
        // Successful request
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
        console.log('Response Data:', response.data);
      })
      .catch((error) => {
        // Invalid request, for 4xx and 5xx statuses
        console.log('Response Status:', error.response.status);
        console.log('Response Headers:', error.response.headers);
        console.log('Response Data:', error.response.data);
      })
      .finally(() => {
        // Always executed.
      });
  }
}
