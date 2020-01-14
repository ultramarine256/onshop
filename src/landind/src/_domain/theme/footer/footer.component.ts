import {Component} from '@angular/core';
import {SmoothScroll} from '../../../_core/extensions';
import {SCROLL_ANCHORS} from '../../../_core/constants';

@Component({
  selector: 'app-footer-component',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
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
