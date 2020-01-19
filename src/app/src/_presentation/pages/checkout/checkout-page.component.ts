import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CartService, ValidationHelper} from '../../../_core';
import {ShopRepository} from '../../../_data';
import {CalendarEventDevExtremeEntity} from './entity';

@Component({
  selector: 'app-checkout-page',
  styleUrls: ['./checkout-page.component.scss'],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {

  /// fields
  public projectFormGroup: FormGroup;
  public billingFormGroup: FormGroup;

  public currentDate: Date = new Date();
  public events = [];

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
    this.events = this.demoData();
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
    // this.isLoading = true;
    // const order = AppMocks.Order__Mock();
    // const json = order.asWooObject();
    // this.shopRepository.placeOrder(order).subscribe((data: any) => {
    //   console.log(data);
    //   this.isLoading = false;
    //   // this.orderCompleted = true;
    //   // this.cartService.clearCart();
    // });
  }

  /// helpers
  public demoData(): Array<CalendarEventDevExtremeEntity> {
    const result: Array<CalendarEventDevExtremeEntity> = [
      new CalendarEventDevExtremeEntity({
        text: 'Test Drive Booking',
        startDate: new Date(2019, 10, 29, 9, 0),
        endDate: new Date(2019, 10, 29, 10, 30),
        description: 'asdasdasd'

      }),
      new CalendarEventDevExtremeEntity({
        text: 'Test Drive Booking',
        startDate: new Date(2019, 10, 29, 9, 0),
        endDate: new Date(2019, 10, 29, 10, 30)
      })
    ];
    return result;
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
