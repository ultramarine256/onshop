import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseRepository } from '../base.repository';
import { OrderCreateModel, OrderResponse } from './model/index';
import { OrderSearchResult } from '@data/repository/order/model/order-search-result';

@Injectable({
  providedIn: 'root',
})
export class OrderRepository extends BaseRepository {
  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public placeOrder(woocommerceOrder: {}): Observable<OrderResponse> {
    return this.httpClient.post<OrderCreateModel>(`${this.apiBaseUrl}/wp-json/onshop/v3/order`, woocommerceOrder).pipe(
      map((dto) => {
        const model = new OrderResponse();
        model.mapFromDto(dto);
        return model;
      })
    );
  }

  public getOrders(page: number = 1, status = ''): Observable<OrderSearchResult> {
    const params: { page: string; status?: string } = {
      page: page.toString(),
    };
    if (status) {
      params.status = status;
    }
    return this.httpClient
      .get<any>(`${this.apiBaseUrl}/wp-json/onshop/v3/user/orders`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          const orders = response.body.map((dto) => {
            const entity = new OrderResponse();
            entity.mapFromDto(dto);
            return entity;
          });

          return new OrderSearchResult(
            orders,
            page,
            +response.headers.get('X-WP-Total'),
            +response.headers.get('X-WP-TotalPages')
          );
        })
      );
  }

  public getOrder(id: number) {
    return this.httpClient.get<OrderResponse>(`${this.apiBaseUrl}/wp-json/onshop/v3/user/orders/` + id).pipe(
      map((resp) => {
        const model = new OrderResponse();
        model.mapFromDto(resp);
        return model;
      })
    );
  }

  public saveNote(note: string, id: number) {
    return this.httpClient.post<OrderCreateModel>(`${this.apiBaseUrl}/wp-json/onshop/v3/user/order/note`, { note, id });
  }
}
