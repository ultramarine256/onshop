import { v1 as uuidv1 } from 'uuid';

export class CartItemEntity {
  public uid: string;
  public id: number;
  public slug: string;
  public imageUrl: string;
  public title: string;
  public price: number;
  public count: number;
  public duration: number;

  constructor(entity?: any) {
    this.uid = uuidv1();
    this.id = entity.id;
    this.slug = entity.slug;
    this.imageUrl = entity.firstImage;
    this.title = entity.name;
    this.price = Number(entity.price);
  }
}
