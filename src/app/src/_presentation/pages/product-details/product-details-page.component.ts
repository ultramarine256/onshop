import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {finalize, map, tap} from 'rxjs/operators';
import {ProductFilter, ProductRepository, ProductModel} from '../../../_data';
import {AppMapper} from '../../_mapper';
import {AuthService, CartService, OWL_CAROUSEL} from '../../../_domain';

@Component({
  selector: 'app-product-details-page',
  styleUrls: ['./product-details-page.component.scss'],
  templateUrl: './product-details-page.component.html',
})
export class ProductDetailsPageComponent implements OnInit {
  /// fields
  public product: ProductModel;
  public relatedProducts: Array<ProductModel> = [];
  public rentalOptions: RentalOptions[] = [];
  /// predicates
  public isLoaded = false;
  public relatedIsLoaded = false;
  public mainSliderLoaded = false;
  public rentalDuration = 1;
  public checkPrice = true;
  public addedToCard = false;
  public toSearch = false;
  public finalePrice: number;

  /// lifecycle
  constructor(
    private productRepository: ProductRepository,
    private route: ActivatedRoute,
    private cartService: CartService,
    public authService: AuthService,
    private location: Location
  ) {
    this.product = new ProductModel();
  }

  ngOnInit() {
    this.mainSliderLoaded = false;
    this.route.params.subscribe((params) =>
      this.productRepository
        .getProducts(new ProductFilter({slug: params.slug}))
        .pipe(finalize(() => (this.isLoaded = true)))
        .pipe(
          tap(() =>
            setTimeout(() => {
              (window as any).$('.product-images').owlCarousel(OWL_CAROUSEL.PRODUCT_IMAGES);
              this.mainSliderLoaded = true;
            }, 300)
          )
        )
        .pipe(map((x) => x.items[0]))
        .subscribe((item) => {
          this.product = item;
          const productProperties = Object.keys(this.product);
          for (const element of productProperties) {
            let rentItem: RentalOptions;
            switch (element) {
              case 'rentPerDayPrice':
                rentItem = new RentalOptions(element, item.rentPerDayPrice, false, 1, 'day');
                this.rentalOptions.push(rentItem);
                break;
              case 'rentPerWeekPrice':
                rentItem = new RentalOptions(element, item.rentPerWeekPrice, false, 7, 'week');
                this.rentalOptions.push(rentItem);
                break;
              case 'rentPerMonthPrice':
                rentItem = new RentalOptions(element, item.rentPerMonthPrice, false, 30, 'month');
                this.rentalOptions.push(rentItem);
                break;
              default:
                break;
            }
          }
          this.productRepository
            .getProducts(new ProductFilter({include: this.product.relatedIds.join(',')}))
            .pipe(finalize(() => (this.relatedIsLoaded = true)))
            .pipe(
              finalize(() =>
                setTimeout(() => (window as any).$('.related-carousel').owlCarousel(OWL_CAROUSEL.DEFAULT_SETTINGS), 200)
              )
            )
            .subscribe((result) => (this.relatedProducts = result.items));
        })
    );
  }

  /// methods

  public addToCart(item: ProductModel, rentDuration: number = 0) {
    this.addedToCard = true;
    const mapedItem = AppMapper.toCartItem(item);
    if (!this.checkPrice) {
      this.rentalOptions.map((x) => {
        if (x.checked) {
          if (this.rentalDuration < 1) {
            this.rentalDuration = 1;
          }
          rentDuration = x.index * this.rentalDuration;
          mapedItem.price = this.product.rentPerDayPrice * rentDuration;
          this.finalePrice = mapedItem.price;
        }
      });
      mapedItem.duration = rentDuration;
    } else {
      mapedItem.price = Number(this.product.price);
      this.finalePrice = mapedItem.price;
    }
    mapedItem.count = 1;
    this.cartService.addItem(mapedItem);
    setTimeout(() => {
      (window as any).toastr.options.positionClass = 'toast-bottom-center';
      (window as any).toastr.success('Added! $' + this.finalePrice);
      this.addedToCard = false;
      this.toSearch = true;
    }, 3000);
  }

  public choseRent(rent) {
    if (rent === 'price') {
      this.checkPrice = !this.checkPrice;
    }
    this.rentalOptions.map((x) => {
      if (x.name === rent) {
        x.checked = !x.checked;
        if (this.checkPrice) {
          this.checkPrice = !this.checkPrice;
        }
      } else {
        x.checked = false;
      }
    });
  }

  public backToSearch() {
    this.location.back();
  }
}

class RentalOptions {
  name: string;
  price: number;
  checked: boolean;
  index: number;
  shortDesc: string;

  constructor(name: string, price: number, checked: boolean, index: number, shortDesc: string) {
    this.name = name;
    this.price = price;
    this.checked = checked;
    this.index = index;
    this.shortDesc = shortDesc;
  }
}
