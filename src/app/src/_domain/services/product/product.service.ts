import { Injectable } from '@angular/core';

import { RentRates } from '@domain/services';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  public getPriceForRent(rentRates: RentRates, daysAmount: number): number {
    return Math.round(daysAmount * this.getPricePerDay(rentRates, daysAmount));
  }

  public getPriceForSale(productPrice: number, count: number): number {
    return productPrice * count;
  }

  private getPricePerDay(rentRates: RentRates, daysAmount: number): number {
    if (daysAmount >= 1 && daysAmount < 7) {
      return rentRates.pricePerDay;
    } else if (daysAmount >= 7 && daysAmount < 30) {
      return +(rentRates.pricePerWeek / 7).toFixed(2);
    }
    return +(rentRates.pricePerMonth / 30).toFixed(2);
  }
}
