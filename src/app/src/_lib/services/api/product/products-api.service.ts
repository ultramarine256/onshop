import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseWooApiService} from '../base-woo-api.service';
import {from} from 'rxjs';

@Injectable()
export class ProductsApiService extends BaseWooApiService {
  public ODataUrl: string;

  constructor(httpClient: HttpClient) {
    super();
    this.ODataUrl = `${this.apiBaseUrl}/odata/audit`;
  }

  public getProducts() {
    // ProductEntity
    const promise = this.wooRestApi.get('products', {
      per_page: 20, // 20 products per page
    });

    return from(promise);

    // .then((response) => {
    //     // Successful request
    //     console.log('Response Status:', response.status);
    //     console.log('Response Headers:', response.headers);
    //     console.log('Response Data:', response.data);
    //     console.log('Total of pages:', response.headers['x-wp-totalpages']);
    //     console.log('Total of items:', response.headers['x-wp-total']);
    //   })
    //     .catch((error) => {
    //       // Invalid request, for 4xx and 5xx statuses
    //       console.log('Response Status:', error.response.status);
    //       console.log('Response Headers:', error.response.headers);
    //       console.log('Response Data:', error.response.data);
    //     })
    //     .finally(() => {
    //       // Always executed.
    //     });
  }
}
