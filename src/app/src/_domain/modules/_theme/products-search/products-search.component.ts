import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, switchMap, takeUntil, tap} from 'rxjs/operators';
import {UnsubscribeMixin} from '@shared/utils/unsubscribe-mixin';
import {ProductFilter, ProductModel, ProductRepository} from '@data/repository';

@Component({
  selector: 'app-products-search',
  styleUrls: ['./products-search.component.scss'],
  templateUrl: './products-search.component.html',
})
export class ProductSearchComponent extends UnsubscribeMixin() implements OnInit {
  public searchResults: Array<ProductModel> = [];
  public products: ProductModel[];
  public searchBar = new FormControl();
  public isLoading = false;

  constructor(private productRepository: ProductRepository) {
    super();
  }

  ngOnInit() {
    this.searchBar.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.isLoading = true)),
        switchMap((search) =>
          this.productRepository.getProducts(new ProductFilter({search})).pipe(tap(() => (this.isLoading = false)))
        )
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.searchResults = res.items));
  }
}
