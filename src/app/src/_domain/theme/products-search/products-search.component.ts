import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from './models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-search',
  styleUrls: ['./products-search.component.scss'],
  templateUrl: './products-search.component.html'
})
export class ProductSearchComponent {
  @Input() searchResults: Array<Product> = [];
  @Output() inputChanged = new EventEmitter<string>();

  public products: Product[];

  constructor(private router: Router) {
  }

  productChosen(slug: string) {
    this.router.navigate([`product/${slug}`]).then();
  }
}

