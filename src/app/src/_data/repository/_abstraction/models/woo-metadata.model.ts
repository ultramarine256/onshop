export class WooMetaData {
  /// fields
  id: number;
  key: string;
  value: string;

  /// constructor
  constructor(init?: Partial<WooMetaData>) {
    Object.assign(this as any, init);
  }

  /// mappers
  mapFromDto(dto: any) {
    this.id = dto.id;
    this.key = dto.key;
    this.value = dto.value;
  }
}
