import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer-component',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  /// binding
  @Input() phone: string;

  /// constructor
  constructor() {
  }
}
