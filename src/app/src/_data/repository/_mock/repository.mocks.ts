import {CreateOrderModel, LineItem, PAYMENT, Shipping} from '../_model';


export class RepositoryMocks {

  public static Order(): CreateOrderModel {
    const result = new CreateOrderModel({
      paymentMethod: PAYMENT.payment_method__bacs,
      paymentMethodTitle: 'Direct Bank Transfer',
      setPaid: false,
      shipping: new Shipping({
        fistName: 'Real2',
        lastName: 'Doe',
        address1: '969 Market',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US'
      }),
      products: [
        new LineItem({
          productId: 80,
          quantity: 1
        })
      ]
    });
    return result;
  }
}
