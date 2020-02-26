import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderCreateModel, OrderResponse} from './model';
import {map} from 'rxjs/operators';

@Injectable()
export class OrderRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public placeOrder(woocommerceOrder: {}): Observable<OrderResponse> {
    return this.httpClient
      .post<OrderCreateModel>(`${this.apiBaseUrl}/wp-json/onshop/v1/order`, woocommerceOrder)
      .pipe(map(dto => {
        const model = new OrderResponse();
        model.mapFromDto(dto);
        return model;
      }));
  }

  public getOrders(): Observable<Array<OrderResponse>> {
    return this.httpClient
      .get<Array<any>>(`${this.apiBaseUrl}/wp-json/onshop/v1/user/orders`)
      .pipe(map(dtos => {

        const result = [];
        for (const item of dtos) {
          const entity = new OrderResponse();
          entity.mapFromDto(item);
          result.push(entity);
        }

        return result;
      }));
  }
}
