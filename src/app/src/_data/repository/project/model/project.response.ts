import { OrderResponse } from '../../order/model/order.response';

export class ProjectResponse {
  id: number;
  name: string;
  description: string;
  orders: OrderResponse[];

  constructor(init?: Partial<ProjectResponse>) {
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.orders = dto.orders
      ? dto.orders.map((order) => {
          const entity = new OrderResponse();
          entity.mapFromDto(order);
          return entity;
        })
      : [];
  }
}
