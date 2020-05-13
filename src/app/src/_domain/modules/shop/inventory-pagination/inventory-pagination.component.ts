import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-inventory-pagination',
  styleUrls: ['./inventory-pagination.component.scss'],
  templateUrl: './inventory-pagination.component.html'
})
export class InventoryPaginationComponent {
  @Input() set itemsCount(value: number) {
    this.inventoryCount = Math.ceil(value / this.maxRange);
    this.pageCounter = 1;
    this.itemsNumber = value;
  }

  @Input() set sortChanged(value: number) {
    this.pageCounter = value;
  }

  @Output() setPagination = new EventEmitter<SetPagination>();
  public inventoryCount: number;
  public pageCounter: number;
  public setPaginationAmount: SetPagination;
  public maxRange = 12;
  public itemsNumber: number;
  public paginationAmounts = [4, 8, 12, 16];

  constructor() {
    this.setPaginationAmount = new SetPagination(this.pageCounter, this.maxRange);
  }

  public pagination(page: number, firstPage: boolean, lastPage: boolean) {
    if ((this.pageCounter === this.inventoryCount) && page === 1) {
      return;
    }
    if (this.pageCounter > 1 && !firstPage && !lastPage && this.pageCounter <= this.inventoryCount) {
      this.pageCounter += page;
    } else if (firstPage) {
      this.pageCounter = 0;
    } else if (lastPage) {
      this.pageCounter = this.inventoryCount;
    } else if (this.pageCounter === 1 && page === -1) {

      return;
    } else if (this.pageCounter === 1 && page === 1) {
      this.pageCounter += page;
    }
    this.setPaginationAmount.setPage = this.pageCounter;
    // console.log(this.setPaginationAmount);
    this.setPaginationAmount.setAmount = this.maxRange;
    this.setPagination.emit(this.setPaginationAmount);
  }

  public setPage(value: number) {
    this.maxRange = value;
    this.inventoryCount = Math.ceil(this.itemsNumber / this.maxRange);
    this.setPaginationAmount.setPage = this.pageCounter;
    this.setPaginationAmount.setAmount = this.maxRange;
    this.setPagination.emit(this.setPaginationAmount);
  }
}

class SetPagination {
  setPage: number;
  setAmount: number;

  constructor(page: number, amount: number) {
    this.setPage = page;
    this.setAmount = amount;
  }
}
