import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters-items-color',
  styleUrls: ['./filters-items-color.component.scss'],
  templateUrl: './filters-items-color.component.html'
})
export class FiltersItemsColorComponent {
  @Output() colorsToSet = new EventEmitter<Array<string>>();
  public colors: Array<string> = ['Orange', 'Black', 'Green', 'V', 'Silver', 'Red'];
  public chosenColors: Array<string> = [];

  public chooseColor(color) {
    if (this.chosenColors && this.chosenColors.includes(color)) {
      const item = this.chosenColors.indexOf(color);
      this.chosenColors.splice(item, 1);
      this.colorsToSet.emit(this.chosenColors);
    } else {
      this.chosenColors.push(color);
      this.colorsToSet.emit(this.chosenColors);
    }
  }
}
