import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService, CartService } from '@domain/services';
import { AppMapper } from '@presentation/_mapper';
import { ProductFilter, ProductModel, ProductRepository } from '../../../_data';

@Component({
  selector: 'app-search-result-page',
  styleUrls: ['./search-result-page.component.scss'],
  templateUrl: './search-result-page.component.html',
})
export class SearchResultPageComponent implements OnInit {
  public isLoading: boolean;
  public term: string;
  public products$: Observable<ProductModel[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productRepository: ProductRepository,
    public authService: AuthService
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
