export class FilterItemsEntity {
  public chooseMaterial(item: string, chosenItems: Array<string>, itemToSet) {
    if (chosenItems && chosenItems.includes(item)) {
      const material = chosenItems.indexOf(item);
      chosenItems.splice(material, 1);
      itemToSet.emit(chosenItems);
    } else {
      chosenItems.push(item);
      itemToSet.emit(chosenItems);
    }
  }
}
