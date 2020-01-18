import {Component} from '@angular/core';
import {SCROLL_ANCHORS, SmoothScroll} from '../../../_core';

@Component({
  selector: 'app-header-component',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /// constants
  public SCROLL_ANCHORS = SCROLL_ANCHORS;

  /// constructor
  constructor() {
  }

  /// methods
  scrollTo(anchor: string) {
    SmoothScroll.doScrolling(`.${anchor}`, 1000);
  }
}

