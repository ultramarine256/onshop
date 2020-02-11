import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {CategoryEntity} from '../_model';

@Injectable()
export class UserRepository extends BaseRepository {

  /// constructor
  constructor(private httpClient: HttpClient) {
    super();
  }

  /// methods
  public getOrders() {
    return this.httpClient
      .get<Array<CategoryEntity>>(`${this.apiBaseUrl}/wp-json/onshop/v1/user/orders`,{withCredentials: true});
  }
}
