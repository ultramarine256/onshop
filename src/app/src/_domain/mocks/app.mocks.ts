import {LineItem, OrderEntity, PAYMENT_METHOD, Shipping} from '../../_core';

export class AppMocks {
  public static Order__Mock(): OrderEntity {
    const result = new OrderEntity({
      paymentMethod: PAYMENT_METHOD.BACS,
      paymentMethodTitle: 'Direct Bank Transfer',
      setPaid: false,

      shipping: new Shipping({
        fistName: 'John',
        lastName: 'Doe',
        address1: '969 Market',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US'
      }),

      lineItems: [
        new LineItem({
          productId: 93,
          quantity: 1
        })
      ]
    });
    return result;
  }
}
