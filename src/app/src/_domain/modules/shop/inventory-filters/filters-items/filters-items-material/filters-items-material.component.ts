import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters-items-material',
  templateUrl: './filters-items-material.component.html'
})
export class FiltersItemsMaterialComponent {
  @Output() materialsToSet = new EventEmitter<Array<string>>();
  public materials: Array<string> = ['Steel', 'Stainless Steel', 'Iron', 'Carbon steel', 'Metal', 'Plastic'];
  public chosenMaterials: Array<string> = [];

  public chooseMaterial(item) {

    if (this.chosenMaterials && this.chosenMaterials.includes(item)) {
      const material = this.chosenMaterials.indexOf(item);
      this.chosenMaterials.splice(material, 1);
      this.materialsToSet.emit(this.chosenMaterials);
    } else {
      this.chosenMaterials.push(item);
      console.log(this.chosenMaterials);
      this.materialsToSet.emit(this.chosenMaterials);
    }
  }
}
