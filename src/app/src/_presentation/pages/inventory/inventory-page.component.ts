import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryEntity, ProductEntity} from '../../../_core';
import {ShopRepository} from '../../../_data';

@Component({
  selector: 'app-inventory-page',
  styleUrls: ['./inventory-page.component.scss'],
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent implements OnInit {
  /// fields
  public items: Array<ProductEntity> = [];
  public category: CategoryEntity = new CategoryEntity();

  /// predicates
  public isLoading = true;
  public categoryIsEmpty = true;

  /// constructor
  constructor(private shopRepository: ShopRepository,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.shopRepository.getProducts().subscribe(items => {
      this.items = items;
      if (items.length === 0) {
        this.categoryIsEmpty = true;
      }
      this.isLoading = false;
    });

    this.route.params.subscribe(params => {
      this.shopRepository.getCategoryBySlug(params.categorySlug).subscribe(item => {
        this.category = item;
      });
    });
  }

  /// methods
  public productClick(slug: string) {
    this.router.navigate([`product/${slug}`]).then();
  }
}

