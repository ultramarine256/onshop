import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters-items-usage',
  templateUrl: './filters-items-usage.component.html'
})
export class FiltersItemsUsageComponent {
  @Output() usageToSet = new EventEmitter<Array<string>>();
  public usage: Array<string> = ['DIY', 'Woodworking', 'Metalworking', 'Hobby', 'Craft',
    'Removing burs', 'Sanding', 'Scraping', 'Sharpening and Shaping', 'Polishing', 'Cleaning', 'Engraving', 'Drilling',
    'Cutting', 'Home', 'Kitchen', 'Industrial Hardware'];
  public chosenUsage: Array<string> = [];

  public chooseUsage(item) {
    if (this.chosenUsage && this.chosenUsage.includes(item)) {
      const material = this.chosenUsage.indexOf(item);
      this.chosenUsage.splice(material, 1);
      this.usageToSet.emit(this.chosenUsage);
    } else {
      this.chosenUsage.push(item);
      console.log(this.chosenUsage);
      this.usageToSet.emit(this.chosenUsage);
    }
  }
}
