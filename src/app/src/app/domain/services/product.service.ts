import { Injectable } from '@angular/core';
import { RentRates } from '../modules';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  public getPriceForRent(rentRates: RentRates, daysAmount: number): number {
    return Math.round(daysAmount * this.getRentPricePerDay(rentRates, daysAmount));
  }

  public getPriceForSale(productPrice: number, count: number): number {
    return productPrice * count;
  }

  private getRentPricePerDay(rentRates: RentRates, daysAmount: number): number {
    if (daysAmount < 7) {
      return +rentRates.pricePerDay.toFixed(2);
    } else if (rentRates.pricePerMonth && daysAmount >= 30) {
      return +(rentRates.pricePerMonth / 30).toFixed(2);
    } else {
      // if price per week or price per month does not exist, and days amount grater than 7
      // we multiply price per day (that always should exist by days amount) by days amount
      return +(rentRates.pricePerDay * daysAmount).toFixed(2);
    }

    // TODO: add in check
    // else if (rentRates.pricePerWeek && days_presentation / app.moduleAmount >= 7 && daysAmount < 30) {
    //     return +(rentRates.pricePerWeek / 7).toFixed(2);
    //   }
  }
}
