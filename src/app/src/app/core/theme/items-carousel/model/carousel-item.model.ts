export class CarouselItemModel {
  title: string;
  imageUrl: string;
  routerUrl: string;

  constructor(init?: Partial<CarouselItemModel>) {
    Object.assign(this as any, init);
  }
}
