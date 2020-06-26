import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { ProductService } from '@domain/services/product.service';
import { AuthService } from '@domain/auth/auth.service';
import { CartService } from '@domain/cart/cart.service';
import { CartItemForRentEntity } from '@domain/cart/cart-item.entity';
import { InfoService } from '@domain/services/info.service';

@Component({
  selector: 'app-checkout-page',
  styleUrls: ['./checkout.component.scss'],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent extends UnsubscribeMixin() implements OnInit {
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
  public order: OrderCreateModel;
  public deliveryFee: number;

  /// predicates
  public orderCompleted = false;
  public currentDate = new Date();

  /// spinners
  public isLoading: boolean;
  public isSubmitInProgress: boolean;

  /// constructor
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository,
    public cartService: CartService,
    public productService: ProductService,
    public infoService: InfoService
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
    return zip(this.userRepository.user$, this.projectRepository.getProjects())
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
        this.deliveryFee = this.infoService.appInfo.deliveryFee;
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
      state: [user.shipping.state, Validators.required],
      zip: [user.shipping.postcode, Validators.required],
      projectNumber: ['', Validators.required],
    });
  }

  public selectDeliveryDate($event) {
    // if order do not have any product for sale show message to user, than explain this behavior
    if (!this.cartService.itemsForSale.length) {
      this.snackBar.open(`You can't change delivery date for rent product`, null, {
        duration: 2000,
      });
      return false;
    }

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
          title: cartItem.title,
          quantity: cartItem.count,
          rentalInfo: (cartItem as CartItemForRentEntity).duration
            ? {
                duration: (cartItem as CartItemForRentEntity).duration,
                dateFrom: (cartItem as CartItemForRentEntity).dateFrom,
                dateTo: (cartItem as CartItemForRentEntity).dateTo,
              }
            : null,
          rentPrice:
            (cartItem as CartItemForRentEntity).duration && (cartItem as CartItemForRentEntity).rentRates
              ? this.productService.getPriceForRent(
                  (cartItem as CartItemForRentEntity).rentRates,
                  (cartItem as CartItemForRentEntity).duration
                )
              : null,
          purchasePrice: this.productService.getPriceForSale(cartItem.price, cartItem.count),
        })
    );
    this.order = new OrderCreateModel({
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
      // delivery date can be date for purchase product if it is exist, all take earliest date from rent products
      deliveryDate:
        this.deliveryDate.value ||
        new Date(Math.min(...this.cartService.itemsForRent.map((item) => new Date(item.dateFrom).getTime()))),
      deliveryInstructions: this.deliveryInstructions.value,
      deliveryTime: this.deliveryTime.value,
      status: OrderStatus.Waiting,
    });

    this.order.products = products;

    this.isSubmitInProgress = true;
    this.orderRepository
      .placeOrder(this.order.mapToWooCommerceOrder())
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

  public isDeliveryDate(date: any): boolean {
    return !!this.cartService.itemsForRent.find(
      (item) =>
        (item as CartItemForRentEntity).dateFrom &&
        new Date((item as CartItemForRentEntity).dateFrom).toLocaleDateString() === date.toLocaleDateString()
    );
  }

  public isPurchaseDate(date: any): boolean {
    return this.deliveryDate.value && this.deliveryDate.value.toLocaleDateString() === date.toLocaleDateString();
  }
}
