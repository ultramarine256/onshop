import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbsService, INavigationItem } from './breadcrumbs.service';
import { StringExtensions } from '@domain/extensions/string.extensions';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  /// fields
  breadcrumbArray: Array<BreadcrumbItem> = [];
  namedBreadcrumbs: Array<string> = [];
  subscription: any;

  /// constructor
  constructor(private router: Router, private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.breadcrumbArray = this.getBreadCrumbs(this.router.url);

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbArray = this.getBreadCrumbs(this.router.url);
      this.breadcrumbArray = this.applyNamedBreadCrumbs(this.namedBreadcrumbs, this.breadcrumbArray);
    });

    this.subscription = this.breadcrumbsService.navItem$.subscribe((item: INavigationItem) => {
      if (item.title === 'flush') {
        if (item.depth === 0) {
          this.namedBreadcrumbs = [];
        } else if (item.depth === 1) {
          this.breadcrumbArray = this.breadcrumbArray.splice(-1, 1);
        }
      }

      if (item.depth != null && item.title !== 'flush') {
        this.namedBreadcrumbs[item.depth] = item.title;
        this.breadcrumbArray = this.applyNamedBreadCrumbs(this.namedBreadcrumbs, this.breadcrumbArray);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyNamedBreadCrumbs(namedBreadcrumbs: Array<string>, breadCrumbs: Array<BreadcrumbItem>): Array<BreadcrumbItem> {
    for (let k = 0; k < namedBreadcrumbs.length; k++) {
      let overviewCounter = 0;
      for (let i = 0; i < breadCrumbs.length; i++) {
        if (breadCrumbs[i].routeName === 'Overview') {
          if (k === overviewCounter) {
            breadCrumbs[i].routeName = namedBreadcrumbs[k];
            k++;
          }
          overviewCounter++;
        }
      }
    }

    return breadCrumbs;
  }

  getBreadCrumbs(url: string): Array<BreadcrumbItem> {
    const result = [];
    const chunks = url.split('/').filter((r) => r.length > 0);

    for (let i = 0; i < chunks.length; i++) {
      const item = new BreadcrumbItem();

      if (Number(chunks[i])) {
        item.routeName = 'Overview';
      } else {
        item.routeName = StringExtensions.capitalizeFirstLetter(chunks[i]);
      }

      let routeUrl = '/';
      for (let j = 0; j <= i; j++) {
        routeUrl += `${chunks[j]}/`;
      }
      item.routeUrl = routeUrl.slice(0, -1);
      item.isActive = false;
      result.push(item);
    }
    result[result.length - 1].isActive = true;

    return result;
  }
}

export class BreadcrumbItem {
  routeUrl: string;
  routeName: string;
  isActive: boolean;
}
