import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {
  LineItem,
  PAYMENT,
  Billing,
  Shipping,
  OrderCreateModel,
  OrderRepository,
  OrderResponse, UserRepository, UserModel
} from '../../../_data';
import {AuthService, CartService, ValidationHelper} from '../../../_domain';

@Component({
  selector: 'app-checkout-page',
  styleUrls: ['./checkout-page.component.scss'],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  /// fields
  public checkoutForm: FormGroup;
  public projects: Array<Project> = [];
  public orderNumber = 'ON-34412';
  public userInfo: UserModel;

  /// predicates
  public orderCompleted = false;

  /// spinners
  public isLoading = false;
  public isUserLoaded = false;
  /// helper
  public validationHelper = ValidationHelper;

  /// constructor
  constructor(private _formBuilder: FormBuilder,
              private orderRepository: OrderRepository,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router,
              private userRepository: UserRepository) {
    this.projects = [
      new Project({id: 'pr-313-1', name: 'Project 313-1'}),
      new Project({id: 'pr-313-2', name: 'Project 313-2'}),
      new Project({id: 'pr-313-3', name: 'Project 313-3'}),
    ];
  }

  ngOnInit() {
    if (this.cartService.itemsCount === 0) {
      this.router.navigate([`/cart`]);
    }

    this.userRepository.getUser().subscribe(item => {
      this.userInfo = item;
      this.checkoutForm = this._formBuilder.group({
        firstName: [item.billing.firstName, Validators.required],
        lastName: [item.billing.lastName, Validators.required],
        email: ['', Validators.required],
        phone: ['+1 444 333 22 11', Validators.required],

        projectName: ['', Validators.required],
        projectNumber: ['', Validators.required],
        deliveryDate: [''],

        address: [item.shipping.address, Validators.required],
        city: [item.shipping.city, Validators.required],
        state: ['', Validators.required],
        zip: [item.shipping.postcode, Validators.required]
      });
      this.isUserLoaded = true;
    });
    // this.checkoutForm.controls.firstName.disable();
    // this.checkoutForm.controls.lastName.disable();
    // this.checkoutForm.controls.email.disable();
    // this.checkoutForm.controls.phone.disable();
    //
    // this.checkoutForm.controls.projectName.disable();
  }

  /// actions
  public cellClick($event) {
    const date = new Date($event.cellData.startDate);
    this.checkoutForm.value.deliveryDate = date;
  }

  /// methods
  public placeOrder(form: FormGroup) {
    debugger
    const model = new OrderCreateModel({
      customerId: this.authService.identity.id,
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
        fistName: form.value.firstName,
        lastName: form.value.lastName,
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
    this.orderRepository.placeOrder(model.mapToWooCommerceOrder())
      .pipe(finalize(() => {
        this.isLoading = false;
        this.orderCompleted = true;
      }))
      .subscribe((item: OrderResponse) => {
        this.orderNumber = item.orderKey;
        this.cartService.clearCart();
      });
  }
}

export class Project {
  /// fields
  id: string;
  name: string;

  /// constructor
  constructor(init?: Partial<Project>) {
    Object.assign(this as any, init);
  }
}
