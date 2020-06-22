import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  // Observable navItem source
  private navItemSource = new BehaviorSubject<INavigationItem>({ depth: null, title: null });
  // Observable navItem stream
  navItem$ = this.navItemSource.asObservable();

  // service command
  changeNav(depthParam: number, titleParam: string) {
    this.navItemSource.next({ depth: depthParam, title: titleParam });
  }
}

export interface INavigationItem {
  depth: number;
  title: string;
}
