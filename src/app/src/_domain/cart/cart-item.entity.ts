import { v1 as uuidv1 } from 'uuid';

import { ProductModel } from '@data/repository';

export abstract class CartItemEntity {
  public uid: string;
  public id: number;
  public slug: string;
  public imageUrl: string;
  public title: string;
  public price: number;
  public count: number;

  constructor(entity?: any) {
    this.uid = uuidv1();
    this.id = entity.id;
    this.slug = entity.slug;
    this.imageUrl = entity.firstImage;
    this.title = entity.name;
    this.price = Number(entity.price);
    this.count = 1;
  }
}

export class CartItemForRentEntity extends CartItemEntity {
  public duration: number;
  public rentRates: RentRates;
  public dateFrom: Date;
  public dateTo: Date;

  constructor(entity: ProductModel, duration: number, dateFrom: Date, dateTo: Date) {
    super(entity);

    this.duration = duration;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.rentRates = entity.rentRates;
  }
}

export class CartItemForSaleEntity extends CartItemEntity {
  public count: number;

  constructor(entity?: ProductModel, count?: number) {
    super(entity);

    this.count = count;
  }
}

export class RentRates {
  public pricePerDay: number;
  public pricePerWeek: number;
  public pricePerMonth: number;

  constructor(pricePerDay?: number, pricePerWeek?: number, pricePerMonth?: number) {
    this.pricePerDay = pricePerDay;
    this.pricePerWeek = pricePerWeek;
    this.pricePerMonth = pricePerMonth;
  }
}
