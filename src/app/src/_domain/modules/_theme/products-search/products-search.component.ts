import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { ProductFilter, ProductModel, ProductRepository } from '@data/repository';

@Component({
  selector: 'app-products-search',
  styleUrls: ['./products-search.component.scss'],
  templateUrl: './products-search.component.html',
})
export class ProductSearchComponent implements OnInit {
  public isLoading = false;

  public products$: Observable<ProductModel[]>;
  public searchBar = new FormControl();

  constructor(private router: Router, private productRepository: ProductRepository) {}

  ngOnInit() {
    this.products$ = this.searchBar.valueChanges.pipe(
      debounceTime(300),
      tap(() => (this.isLoading = true)),
      switchMap((search) => {
        return (search ? this.productRepository.getProducts(new ProductFilter({ search })) : of({ items: [] })).pipe(
          tap(() => (this.isLoading = false))
        );
      }),
      map((productSearchResult) => productSearchResult.items)
    );
  }

  search() {
    const term = this.searchBar.value;
    this.searchBar.setValue('');
    this.router.navigate(['/search'], { queryParams: { term } });
  }
}
