import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters-items-manufacture',
  templateUrl: './filters-items-manufacture.component.html'
})
export class FiltersItemsManufactureComponent {
  @Output() manufacturesToSet = new EventEmitter<Array<string>>();
  public manufacturer: Array<string> = ['Meterk', 'Makita', 'Dremel', 'TACKLIFE',
    'VonHaus', 'Winload', 'Afantti', 'Utool Power Engraver', 'Dewalt',
    'Einhell', 'CEL', 'DAHTEC', 'Dr Infrared Heater', 'REMINGTON',
    'Titan', 'Karcher', 'Nilfisk', 'HEPA', 'Greenworks', 'Chiloskit', 'ECOTRIC', 'Superbuy', 'Ohuhu', 'Fivepears', 'Nozzle', 'JAR-OWL'];
  public chosenManufactures: Array<string> = [];

  public chooseManufacture(item) {
    if (this.chosenManufactures && this.chosenManufactures.includes(item)) {
      const material = this.chosenManufactures.indexOf(item);
      this.chosenManufactures.splice(material, 1);
      this.manufacturesToSet.emit(this.chosenManufactures);
    } else {
      this.chosenManufactures.push(item);
      this.manufacturesToSet.emit(this.chosenManufactures);
    }
  }
}
