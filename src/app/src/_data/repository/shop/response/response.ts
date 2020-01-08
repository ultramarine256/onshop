export class ApiResponse {
  items: Array<any>;
  totalCount: number;

  constructor() {
    this.items = [];
  }
}

export class WooResponse<T> {
  data: Array<T>;
  status: number;
}
