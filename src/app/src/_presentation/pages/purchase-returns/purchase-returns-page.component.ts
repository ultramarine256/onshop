import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel, UserRepository} from '../../../_data/repository/user';

@Component({
  selector: 'app-purchase-returns-page',
  styleUrls: ['./purchase-returns-page.component.scss'],
  templateUrl: './purchase-returns-page.component.html'
})
export class PurchaseReturnsPageComponent implements OnInit {
  public currentDate = new Date();
  public returnProductForm: FormGroup;
  public userInfo: UserModel;
  public didLoaded = false;
  public returnInfo: any;
  public deliveryDate: Date;
  public complete = false;

  constructor(private formBuilder: FormBuilder, private userRepository: UserRepository) {

  }

  ngOnInit() {
    this.userRepository.getUser().subscribe(item => {
      this.userInfo = item;
      this.returnProductForm = this.formBuilder.group({
        address: ['', Validators.required],
        description: '',
        uniqueCode: ['', Validators.required]
      });
      this.didLoaded = true;
    });
    this.deliveryDate = new Date();
  }

  public onSubmit(formValue) {
    this.returnInfo = formValue;
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

  public cellClick($event) {
    const date = new Date($event.cellData.startDate);
    if (date <= this.currentDate) {
      (window as any).toastr.options.positionClass = 'toast-top-center';
      (window as any).toastr.error('Can not schedule to the past!');
      return;
    } else {
      this.deliveryDate = date;
      (window as any).toastr.options.positionClass = 'toast-top-center';
      (window as any).toastr.success(`Scheduled: ${date.toLocaleDateString()}`);
    }
  }

  public return() {
    console.log(this.returnInfo);
  }
}
