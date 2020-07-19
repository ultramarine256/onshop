export class TagModel {
  id: number;
  name: string;
  slug: string;
  count: number;

  constructor(props?: any) {
    this.id = props.term_id;
    this.name = props.name;
    this.slug = props.slug;
    this.count = props.count;
  }
}
