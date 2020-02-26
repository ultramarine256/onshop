export class CarouselItemModel {
  /// fields
  title: string;
  imageUrl: string;
  routerUrl: string;

  /// constructor
  constructor(init?: Partial<CarouselItemModel>) {
    Object.assign(this as any, init);
  }
}
