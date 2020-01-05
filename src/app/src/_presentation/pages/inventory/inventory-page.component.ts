import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductEntity} from '../../../_core';
import {ShopApiService} from '../../../_data';

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent {
  /// fields
  public items2: Array<ProductItem> = [
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    },
    {
      id: 1,
      title: 'Product 1'
    }
  ];
  public items: Array<ProductEntity> = [];

  /// predicates
  public didLoaded = false;

  /// constructor
  constructor(private shopApiService: ShopApiService,
              private route: ActivatedRoute,
              private router: Router) {
    this.shopApiService.getProducts().subscribe(data => {
      this.items = data.items;
    });
  }

  /// methods
  public productClick(id: number) {
    this.router.navigate([`product/${id}`]).then();
  }
}

export class ProductItem {
  id: number;
  title: string;
}
