import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import {
  BillingModel,
  DeliveryTime,
  LineItemModel,
  OrderCreateModel,
  OrderRepository,
  OrderResponse,
  OrderStatus,
  Payment,
  ProjectRepository,
  ProjectResponse,
  ShippingModel,
  UserModel,
  UserRepository,
} from '@data/repository';
import { AuthService, CartService } from '@domain/index';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';

@Component({
  selector: 'app-checkout-page',
  styleUrls: ['./checkout-page.component.scss'],
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent extends UnsubscribeMixin() implements OnInit {
  /// fields
  public checkoutForm: FormGroup;
  public projects: ProjectResponse[];
  public orderNumber: string;
  public user: UserModel;
  public deliveryDate: FormControl;
  public deliveryInstructions: FormControl;
  public deliveryTime: FormControl;
  public deliveryTimeOptions = DeliveryTime;
  public products = this.cartService.items;

  /// predicates
  public orderCompleted = false;
  public currentDate = new Date();

  /// spinners
  public isLoading: boolean;
  public isSubmitInProgress: boolean;

  /// constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository
  ) {
    super();
  }

  ngOnInit() {
    if (!this.cartService.itemsCount) {
      this.router.navigate([`/cart`]);
    }
    this.loadInfo();
  }

  private loadInfo() {
    this.isLoading = true;
    return zip(this.userRepository.getUser(), this.projectRepository.getOrders())
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(([user, projectItems]) => {
        this.user = user;
        this.checkoutForm = this.getCheckoutForm(user);
        this.deliveryDate = new FormControl('', [Validators.required]);
        this.deliveryInstructions = new FormControl('');
        this.deliveryTime = new FormControl(this.deliveryTimeOptions.Am);
        this.projects = projectItems;
      });
  }

  private getCheckoutForm(user: UserModel): FormGroup {
    return this.fb.group({
      firstName: [user.billing.firstName, Validators.required],
      lastName: [user.billing.lastName, Validators.required],
      email: [user.billing.email, [Validators.required, Validators.email]],
      phone: [user.billing.phone, Validators.required],
      address: [user.shipping.address, Validators.required],
      city: [user.shipping.city, Validators.required],
      state: ['', Validators.required],
      zip: [user.shipping.postcode, Validators.required],
      projectNumber: ['', Validators.required],
    });
  }

  public selectDeliveryDate($event) {
    if ($event.cellData.startDate <= this.currentDate) {
      return;
    }
    this.deliveryDate.setValue($event.cellData.startDate);
  }

  public submit() {
    const form = this.checkoutForm;
    const products = this.cartService.items.map(
      (cartItem) =>
        new LineItemModel({
          productId: cartItem.id,
          quantity: cartItem.count,
          rentalDuration: cartItem.duration,
          total: cartItem.price,
        })
    );
    const order = new OrderCreateModel({
      customerId: this.authService.identity.id,
      paymentMethod: Payment.Bacs,
      paymentMethodTitle: Payment.Direct,
      setPaid: false,
      billing: new BillingModel({
        fistName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
      }),
      shipping: new ShippingModel({
        fistName: form.value.firstName,
        lastName: form.value.lastName,
        address1: form.value.address,
        city: form.value.city,
        state: form.value.state,
        postcode: form.value.zip,
      }),
      projectName: form.value.projectName,
      projectNumber: form.value.projectNumber,
      deliveryDate: this.deliveryDate.value,
      deliveryInstructions: this.deliveryInstructions.value,
      deliveryTime: this.deliveryTime.value,
      status: products.some((product) => product.rentalDuration) ? OrderStatus.InRent : OrderStatus.Pending,
    });

    order.products = products;

    this.isSubmitInProgress = true;
    this.orderRepository
      .placeOrder(order.mapToWooCommerceOrder())
      .pipe(
        finalize(() => {
          this.isSubmitInProgress = false;
          this.orderCompleted = true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((item: OrderResponse) => {
        this.orderNumber = item.orderKey;
        this.cartService.clearCart();
      });
  }
}
