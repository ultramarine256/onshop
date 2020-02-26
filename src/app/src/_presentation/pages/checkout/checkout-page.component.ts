import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {
  LineItem,
  PAYMENT,
  Billing,
  Shipping,
  OrderCreateModel,
  OrderRepository,
  OrderResponse
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
  public selectedDate;
  /// predicates
  public orderCompleted = false;
  public orderNumber = 'ON-34412';
  public delivery = 60;

  /// spinners
  public isLoading = false;
  public choseDate = false;

  /// helper
  public validationHelper = ValidationHelper;

  /// constructor
  constructor(private _formBuilder: FormBuilder,
              private orderRepository: OrderRepository,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router) {
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

    this.checkoutForm = this._formBuilder.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['john@mail.com', Validators.required],
      phone: ['+1 444 333 22 11', Validators.required],

      projectName: ['', Validators.required],
      projectNumber: ['', Validators.required],
      deliveryDate: [''],

      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });

    this.checkoutForm.controls.firstName.disable();
    this.checkoutForm.controls.lastName.disable();
    this.checkoutForm.controls.email.disable();
    this.checkoutForm.controls.phone.disable();

    this.checkoutForm.controls.projectName.disable();
  }

  // @HostListener('click', ['$event.target'])
  // onClick(btn) {
  //   if (this.button && !btn.className.includes('dx-scheduler-date-table-cell dx-scheduler-cell-sizes-horizontal dx-scheduler-cell-sizes-vertical dx-state-focused dx-scheduler-focused-cell dx-state-active')) {
  //     this.button.classList.add('dx-state-focused');
  //     this.button.classList.add('dx-scheduler-focused-cell');
  //   }
  //   if (btn.className.includes
  //   ('dx-scheduler-date-table-cell dx-scheduler-cell-sizes-horizontal dx-scheduler-cell-sizes-vertical dx-state-focused dx-scheduler-focused-cell dx-state-active')) {
  //     this.button = btn as HTMLElement;
  //   }
  //   /*
  //       if(this.previousButton){
  //         this.previousButton.classList.remove('dx-state-focused');
  //         this.previousButton.classList.remove('dx-scheduler-focused-cell');
  //       }
  //   */
  //
  //   // console.log(this.elRef.nativeElement.querySelector(btn.innerHTML));
  //   console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
  // }
  /// actions
  public cellClick($event) {
    const date = new Date($event.cellData.startDate);
    this.checkoutForm.value.deliveryDate = date;
    this.choseDate = true;
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

  isWeekEnd(date) {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      this.delivery = 90;
    } else {
      this.delivery = 60;
    }
    return day === 0 || day === 6;
  }

  markWeekEnd(cellData) {
    const classObject = {};
    classObject['employee-weekend'] = this.isWeekEnd(cellData.startDate);
    return classObject;
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
