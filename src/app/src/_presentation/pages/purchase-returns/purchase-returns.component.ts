import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';

import { ProductItem, UserRepository } from '@data/repository';
import { OrderRepository, OrderResponse } from '@data/repository/order';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { FormsService } from '@shared/services/forms.service';

@Component({
  selector: 'app-purchase-returns',
  styleUrls: ['./purchase-returns.component.scss'],
  templateUrl: './purchase-returns.component.html',
})
export class PurchaseReturnsComponent extends UnsubscribeMixin() implements OnInit {
  public order: OrderResponse;
  public orderId: number;
  public filteredProducts: ProductItem[];
  public deliveryInfo: FormGroup;

  public minDate: Date;
  public selection = new SelectionModel<any>(true, []);

  public isLoading: boolean;
  public isSubmitInProgress: boolean;
  public sent: boolean;

  constructor(
    private fb: FormBuilder,
    private userRepository: UserRepository,
    private orderRepository: OrderRepository,
    private route: ActivatedRoute,
    private formsService: FormsService
  ) {
    super();
  }

  ngOnInit() {
    this.orderId = +this.route.snapshot.params.id;

    this.isLoading = true;
    this.orderRepository
      .getOrder(this.orderId)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((order) => {
        this.order = order;
        this.filteredProducts = order.productItems.filter((product) => product.hasRent);

        this.deliveryInfo = this.fb.group({
          address: [order.shipping.address1, Validators.required],
          deliveryDate: [null, Validators.required],
        });
        this.minDate = moment().add(3, 'days').toDate();

        this.masterToggle(); // select all products
      });
  }

  public masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.filteredProducts.forEach((row) => this.selection.select(row));
  }

  public toggle(product: ProductItem) {
    this.selection.toggle(product);
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredProducts.length;
    return numSelected === numRows;
  }

  public submit() {
    if (!this.formsService.validate(this.deliveryInfo)) {
      return;
    }

    this.isSubmitInProgress = true;
    this.orderRepository
      .saveNote(this.getFormattedNote(), this.orderId)
      .pipe(
        tap(() => (this.sent = true)),
        finalize(() => (this.isSubmitInProgress = false)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private getFormattedNote(): string {
    return `Order #${this.order.id}, address: ${this.deliveryInfo.get('address').value}, date: ${moment(
      this.deliveryInfo.get('deliveryDate').value
    ).format('lll')}, products: ${this.selection.selected
      .map((product) => `#${product.id} - ${product.name}`)
      .join('; ')}`;
  }
}
