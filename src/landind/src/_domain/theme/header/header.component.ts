import {Component} from '@angular/core';
import {SmoothScroll} from '../../../_core';

@Component({
  selector: 'app-header-component',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  /// constants
  public scrollAnchors = {
    technology: 'anchor__technology',
    examples: 'anchor__examples',
    aboutUs: 'anchor__about-us'
  };

  /// constructor
  constructor() {
  }

  /// methods
  scrollTo(anchor: string) {
    SmoothScroll.doScrolling(`.${anchor}`, 1000);
  }
}

