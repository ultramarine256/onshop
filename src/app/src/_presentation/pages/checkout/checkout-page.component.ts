import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService, ValidationHelper} from '../../../_core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  styleUrls: ['./checkout-page.component.scss'],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {

  /// fields
  public projectFormGroup: FormGroup;
  public billingFormGroup: FormGroup;

  /// predicates
  public orderCompleted = false;
  public orderNumber = 'ON-34412';

  /// spinners
  public isLoading = false;

  /// helper
  public validationHelper = ValidationHelper;

  /// constructor
  constructor(private _formBuilder: FormBuilder,
              public cartService: CartService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.cartService.itemsCount === 0) {
      this.router.navigate([`/cart`]);
    }

    // this.projectFormGroup = new FormGroup({
    //   requestedBy: new FormControl('', [
    //     Validators.required,
    //   ])
    // });

    this.projectFormGroup = this._formBuilder.group({
      requestedBy: ['', Validators.required],
      projectName: ['', Validators.required],
      projectNumber: ['', Validators.required],

      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });

    this.billingFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  /// methods
  public makeOrder() {
    this.orderCompleted = true;
    this.cartService.clearCart();

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}

export class ProjectInfo {
  requestedBy: string;
  projectName: string;
  projectNumber: string;

  address: string;
  city: string;
  state: string;
  zip: string;
}

export class ConfirmBilling {
  fullName: string;
  projectName: string;
  projectNumber: string;
}
