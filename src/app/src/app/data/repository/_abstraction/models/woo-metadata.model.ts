export class WooMetaData {
  id: number;
  key: string;
  value: string;

  constructor(init?: Partial<WooMetaData>) {
    Object.assign(this as any, init);
  }

  mapFromDto(dto: any) {
    this.id = dto.id;
    this.key = dto.key;
    this.value = dto.value;
  }
}
