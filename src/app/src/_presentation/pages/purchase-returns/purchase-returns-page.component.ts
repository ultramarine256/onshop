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
  public orderInfo: OrderResponse;
  public orderId: number;
  public note = '';
  public serializedDate = new FormControl((new Date()).toISOString());
  public minDate: Date;
  // Spinners
  public wrongUser = false;
  public didLoaded = false;

  constructor(private formBuilder: FormBuilder, private userRepository: UserRepository, private orderRepository: OrderRepository,
              private route: ActivatedRoute) {
    this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3);
  }

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderRepository.getOrders().subscribe(resp => {
      if (resp.filter(x => x.id === this.orderId).length > 0) {
        this.orderRepository.getOrder(this.orderId).subscribe(response => {
          this.orderInfo = response;
          this.didLoaded = true;
        });
      } else {
        (window as any).toastr.options.positionClass = 'toast-bottom-right';
        (window as any).toastr.error('You are not allowed to do this!');
        this.wrongUser = true;
      }
    });
  }

  public EndDateChange(date) {
    this.note = 'Ready to return! Date:(' +
      date.toDateString();
  }

  public createNote() {
    this.note += `)Adress:(${this.orderInfo.shipping.address_1})`;
    this.orderRepository.postNote(this.note, this.orderId).subscribe(() => alert('done'));
    console.log(this.note);
  }
}
