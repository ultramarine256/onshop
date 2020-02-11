import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {CartService, ValidationHelper} from '../../../_core';
import {ShopRepository, CreateOrderModel, LineItem, PAYMENT, Billing, Shipping, ResponseOrderModel} from '../../../_data';

@Component({
  selector: 'app-checkout-page',
  styleUrls: ['./checkout-page.component.scss'],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  /// fields
  public checkoutForm: FormGroup;

  /// predicates
  public orderCompleted = false;
  public orderNumber = 'ON-34412';

  /// spinners
  public isLoading = false;

  /// helper
  public validationHelper = ValidationHelper;

  /// constructor
  constructor(private _formBuilder: FormBuilder,
              private shopRepository: ShopRepository,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.cartService.itemsCount === 0) {
      this.router.navigate([`/cart`]);
    }

    this.checkoutForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],

      projectName: ['', Validators.required],
      projectNumber: ['', Validators.required],
      deliveryDate:  [''],

      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  /// actions
  public cellClick($event) {
    const date = new Date($event.cellData.startDate);
    this.checkoutForm.value.deliveryDate = date;
  }

  /// methods
  public placeOrder(form: FormGroup) {

    const model = new CreateOrderModel({
      paymentMethod: PAYMENT.payment_method__bacs,
      paymentMethodTitle: PAYMENT.payment_title__direct,
      setPaid: false,
      billing: new Billing({
        fistName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
      }),
      shipping: new Shipping({
        address1: form.value.address,
        city: form.value.city,
        state: form.value.state,
        postcode: form.value.zip,
      }),
      deliveryDate: new Date(),
      projectName: form.value.projectName,
      projectNumber: form.value.projectNumber,
    });

    for (const item of this.cartService.getItems) {
      model.products.push(new LineItem({
        productId: item.id,
        quantity: item.count
      }));
    }

    this.isLoading = true;
    this.shopRepository.placeOrder(model.mapToWooCommerceOrder())
      .pipe(finalize(() => {
        this.isLoading = false;
        this.orderCompleted = true;
      }))
      .subscribe((item: ResponseOrderModel) => {
        this.orderNumber = item.orderKey;
        this.cartService.clearCart();
      });
  }
}
