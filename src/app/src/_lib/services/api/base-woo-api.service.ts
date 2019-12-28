import {BaseApiService} from './base-api.service';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import {environment} from '../../../environments/environment';

export abstract class BaseWooApiService extends BaseApiService {
  /// fields
  public wooRestApi = null;

  /// constructor
  protected constructor() {
    super();
    this.wooRestApi = new WooCommerceRestApi({
      url: environment.apiBaseUrl,
      consumerKey: 'ck_d6a91449c9eeb38d7a531bbb97f5c8a9d099f9d3',
      consumerSecret: 'cs_e4eb8193b272bedaba8309f938ce0a6b358adffb',
      version: 'wc/v3'
    });
  }
}
