import { Component, OnInit } from '@angular/core';
import { UnsubscribeMixin } from '@shared/utils/unsubscribe-mixin';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductFilter, ProductModel, ProductRepository } from '@data/repository';

@Component({
  selector: 'app-products-search',
  styleUrls: ['./products-search.component.scss'],
  templateUrl: './products-search.component.html',
})
export class ProductSearchComponent extends UnsubscribeMixin() implements OnInit {
  public searchResults: Array<ProductModel> = [];
  public products: ProductModel[];
  public myControl = new FormControl();
  public isLoading = false;

  constructor(private productRepository: ProductRepository) {
    super();
  }

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => (this.isLoading = true)),
        switchMap((text) =>
          this.productRepository
            .getProducts(new ProductFilter({ search: text }))
            .pipe(tap(() => (this.isLoading = false)))
        )
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.searchResults = res.items));
  }
}
