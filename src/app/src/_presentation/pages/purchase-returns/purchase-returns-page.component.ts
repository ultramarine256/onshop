import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel, UserRepository} from '../../../_data/repository/user';
import {OrderRepository, OrderResponse} from '../../../_data/repository/order';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-purchase-returns-page',
  styleUrls: ['./purchase-returns-page.component.scss'],
  templateUrl: './purchase-returns-page.component.html'
})
export class PurchaseReturnsPageComponent implements OnInit {
  public returnProductForm: FormGroup;
  public didLoaded = false;
  public orderInfo: OrderResponse;
  public orderId: number;
  public note = '';
  serializedDate = new FormControl((new Date()).toISOString());
  public minDate: Date;
  public maxDate: Date;

  constructor(private formBuilder: FormBuilder, private userRepository: UserRepository, private orderRepository: OrderRepository, private route: ActivatedRoute) {
    const currentYear = new Date().getFullYear();
    const d = new Date().getDate() + 1;
    const m = new Date().getMonth();
    this.minDate = new Date(currentYear, m, d);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderRepository.getOrder(this.orderId).subscribe(resp => {
      console.log(resp);
      this.orderInfo = resp;
      this.didLoaded = true;
    });
  }

  public EndDateChange(date) {
    // const a = date.toDateString();
    this.note = 'Ready to return! Date:(' +
      date.toDateString();
  }

  public createNote() {
    this.note += ')Adress:(' + this.orderInfo.shipping.address_1 + ')';
    console.log(this.note);
    this.orderRepository.postNote(this.note, this.orderId).subscribe(() => alert('done'));
  }
}
