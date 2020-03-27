export class ProjectEntity {
  id: number;
  name: string;
  description: string;

  constructor(init?: Partial<ProjectEntity>) {
    Object.assign(this as any, init);
  }

  /// mapper
  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
  }
}

