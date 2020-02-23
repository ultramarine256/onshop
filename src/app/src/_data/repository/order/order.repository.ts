import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderCreateModel, OrderCreateResponse} from './model';
import {map} from 'rxjs/operators';

@Injectable()
export class OrderRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public placeOrder(woocommerceOrder: {}): Observable<OrderCreateResponse> {
    return this.httpClient
      .post<OrderCreateModel>(`${this.apiBaseUrl}/wp-json/onshop/v1/order`, woocommerceOrder)
      .pipe(map(dto => {
        const model = new OrderCreateResponse();
        model.mapFromWooDto(dto);
        return model;
      }));
  }
}
