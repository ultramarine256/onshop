export class ProjectEntity {
  id: number;
  name: string;
  marketSegment: string;
  code: string;
  address: string;
  description: string;
  pricingMargin: string;
  estimatedStartDate: Date;

  constructor(init?: Partial<ProjectEntity>) {
    Object.assign(this as any, init);
  }

  // mapper
  public mapFromDto(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.marketSegment = dto.market_segment;
    this.code = dto.code;
    this.address = dto.address;
    this.pricingMargin = dto.pricing_margin;
    this.estimatedStartDate = dto.estimated_start_date ? new Date(+dto.estimated_start_date) : null;
  }

  public toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      market_segment: this.marketSegment,
      code: this.code,
      address: this.address,
      pricing_margin: this.pricingMargin,
      estimated_start_date: this.estimatedStartDate.getTime()
    };
  }
}
