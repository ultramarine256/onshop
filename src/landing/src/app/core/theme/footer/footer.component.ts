import {Component} from '@angular/core';
import {SmoothScroll} from '../../extensions';
import {SCROLL_ANCHORS} from '../../constants';

@Component({
  selector: 'app-footer-component',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public SCROLL_ANCHORS = SCROLL_ANCHORS;

  constructor() {
  }

  scrollTo(anchor: string) {
    SmoothScroll.doScrolling(`.${anchor}`, 1000);
  }
}
