export class StringExtensions {
  static cropString(str: string, truncateLength: number): string {
    let cropped = str.substring(0, truncateLength);
    cropped = cropped.substring(0, cropped.lastIndexOf(' '));
    return cropped;
  }

  static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
