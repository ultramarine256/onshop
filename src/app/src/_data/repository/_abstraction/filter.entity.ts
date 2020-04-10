export abstract class FilterEntity {
  /// mappers
  public asQueryString(): string {
    const obj = {} as any;
    for (const key of Object.keys(this)) {
      if (key === 'filters') {
        continue;
      }
      obj[key] = this[key];
    }
    return this._buildQueryString(obj);
  }

  /// helpers
  private _buildQueryString(parameters: any): string {
    let qs = '';
    for (const key in parameters) {
      const value = parameters[key];
      if (value == null) {
        continue;
      }

      if (value) {
        qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
      }
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); // chop off last "&"
    }
    return qs;
  }
}
