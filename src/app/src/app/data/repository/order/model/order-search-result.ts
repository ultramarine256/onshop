import { OrderResponse } from './order.response';

export class OrderSearchResult {
  orders: OrderResponse[];
  currentPage: number;
  totalCount: number;
  totalPages: number;

  constructor(orders: OrderResponse[], currentPage: number, totalCount: number, totalPages: number) {
    this.orders = orders;
    this.currentPage = currentPage;
    this.totalCount = totalCount;
    this.totalPages = totalPages;
  }
}
