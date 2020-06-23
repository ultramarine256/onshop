import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProductFilter, ProductModel, ProductRepository } from '@data/index';

@Component({
  selector: 'app-search-result',
  styleUrls: ['./search-result.component.scss'],
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent implements OnInit {
  public isLoading: boolean;
  public term: string;
  public products$: Observable<ProductModel[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productRepository: ProductRepository
  ) {}

  ngOnInit(): void {
    this.products$ = this.activatedRoute.queryParams.pipe(
      switchMap((params) => {
        this.term = params.term;
        return this.productRepository.getProducts(new ProductFilter({ search: params.term }));
      }),
      map((productSearchResult) => productSearchResult.items)
    );
  }
}
