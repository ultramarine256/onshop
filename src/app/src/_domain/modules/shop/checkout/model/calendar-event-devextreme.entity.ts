export class CalendarEventDevExtremeEntity {
  /// fields
  text: string;
  startDate: Date;
  endDate: Date;
  description: string;
  color: string;

  /// constructor
  constructor(init?: Partial<CalendarEventDevExtremeEntity>) {
    Object.assign(this as any, init);
  }
}
