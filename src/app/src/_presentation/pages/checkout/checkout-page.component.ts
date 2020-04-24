import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DxSchedulerModule, DxTemplateModule} from 'devextreme-angular';
import {finalize} from 'rxjs/operators';
import {
  LineItem,
  PAYMENT,
  Billing,
  Shipping,
  OrderCreateModel,
  OrderRepository,
  OrderResponse, UserRepository, UserModel, ProjectRepository, ProjectResponse
} from '../../../_data';
import {AuthService, CartItemEntity, CartService, ValidationHelper} from '../../../_domain';
import data from 'devextreme';


@Component({
  selector: 'app-checkout-page',
  styleUrls: ['./checkout-page.component.scss'],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  /// fields
  public checkoutForm: FormGroup;
  public projects: Array<ProjectResponse> = [];
  public orderNumber = 'ON-34412';
  public userInfo: UserModel;
  public products: CartItemEntity[] = [];
  /// predicates
  public orderCompleted = false;
  const;
  currentDate = new Date();

  /// spinners
  public isLoading = false;
  public isUserLoaded = false;
  public didLoaded = false;

  /// helper
  public validationHelper = ValidationHelper;

  /// constructor
  constructor(private _formBuilder: FormBuilder,
              private orderRepository: OrderRepository,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router,
              private userRepository: UserRepository,
              private projectRepository: ProjectRepository) {
  }

  ngOnInit() {
    if (this.cartService.itemsCount === 0) {
      this.router.navigate([`/cart`]);
    }
    this.projectRepository.getOrders()
      .pipe(finalize(() => this.didLoaded = true))
      .subscribe((items: Array<ProjectResponse>) => this.projects = items);
    this.products = this.cartService.getItems;
    this.userRepository.getUser().subscribe(item => {
      this.userInfo = item;
      this.checkoutForm = this._formBuilder.group({
        firstName: [item.billing.firstName, Validators.required],
        lastName: [item.billing.lastName, Validators.required],
        email: [item.billing.email, Validators.required],
        phone: [item.billing.phone, Validators.required],
        address: [item.shipping.address, Validators.required],
        city: [item.shipping.city, Validators.required],
        state: ['', Validators.required],
        zip: [item.shipping.postcode, Validators.required],
        projectNumber: ['', Validators.required],
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
    if (date <= this.currentDate) {
      (window as any).toastr.options.positionClass = 'toast-top-center';
      (window as any).toastr.error('No delivery to the past!');
      return;
    } else {
      this.checkoutForm.value.deliveryDate = date;
      (window as any).toastr.options.positionClass = 'toast-top-center';
      (window as any).toastr.success(`Delivery: ${date.toLocaleDateString()}`);
    }

  }

  /// methods
  public placeOrder(form: FormGroup) {
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
      projectNumber: form.value.projectNumber
    });

    for (const item of this.cartService.getItems) {
      model.products.push(new LineItem({
        productId: item.id,
        quantity: item.count,
        rentalDuration: item.duration,
        total: item.price
      }));
    }
    console.log(model);
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

  markWeekEnd(cellData) {
    const date = new Date(cellData.startDate);
    if (date <= this.currentDate) {
      return 'pastDay';
    } else {
      const day = date.getDay();
      return day === 0 || day === 6;
    }
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
