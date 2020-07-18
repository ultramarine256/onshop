export class ObjectExtensions {
  static clean(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') { ObjectExtensions.clean(obj[key]); } // recurse
      else if (obj[key] == null) { delete obj[key]; } // delete
    });
  }
}
