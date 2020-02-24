export class DateExtensions {
  static dayOfWeek(date: Date): string {
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    return weekday[date.getDay()];
  }

  static monthDayYear(date: Date): string {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }

  static usaDateTimeFormat(date: Date) {
    return `${date.toLocaleDateString('en-US')} ${date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}`;
  }

  static isNotNull(date: Date): boolean {
    return (date.getFullYear() !== 0 || date.getMonth()) !== 0 && date.getHours() !== 0;
  }

  static formatUtcDateTimeToLocalTimezone(dateTime: Date): Date {
    return new Date((new Date(dateTime)).getTime() - (60 * 1000 * new Date().getTimezoneOffset()));
  }

  public static formatDateTime(date: Date): string {
    if (date != null && DateExtensions.isNotNull(date)) {
      return DateExtensions.usaDateTimeFormat(DateExtensions.formatUtcDateTimeToLocalTimezone(date));
    }
    return null;
  }

  static formatAMPM(date: Date): string {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  static getHoursPassedFromDate(date: Date): number {
    return Math.floor(Math.abs(new Date().valueOf() - date.valueOf()) / 36e5);
  }
}
