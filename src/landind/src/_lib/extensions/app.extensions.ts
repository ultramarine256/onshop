/**
 * ------------------------------------------------------------------------
 * Variable
 * ------------------------------------------------------------------------
 */

export class Variable {
  static isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  static isNotNullOrUndefined(object: any): boolean {
    return !Variable.isNullOrUndefined(object);
  }

  static isEmptyString(object: any): boolean {
    return object === '';
  }

  static isNullOrUndefinedOrEmptyString(object: any): boolean {
    return Variable.isNullOrUndefined(object) || Variable.isEmptyString(object);
  }

  static isNotNullOrUndefinedOrEmptyString(object: any): boolean {
    return !Variable.isNullOrUndefinedOrEmptyString(object);
  }

  static isFunction(functionToCheck: any): boolean {
    return functionToCheck && ({}).toString.call(functionToCheck) === '[object Function]';
  }
}

/**
 * ------------------------------------------------------------------------
 * JSON
 * ------------------------------------------------------------------------
 */

export class JsonExtensions {

  static PrettifyJson(json: string): string {
    if (!json || !JsonExtensions.IsJsonStringValid(json)) {
      return null;
    }

    const obj = JSON.parse(json);
    const str = JSON.stringify(obj, undefined, 2);
    return JsonExtensions.SyntaxHighlight(str);
  }

  static IsJsonStringValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static SyntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Web
 * ------------------------------------------------------------------------
 */

export class WebExtensions {
  static parseQueryString(queryString: string): any {
    const query: any = {};

    if (!Variable.isNotNullOrUndefinedOrEmptyString(queryString)) {
      return query;
    }

    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    // TODO: hack for ImgaURL that may contain Query Parameters
    if (queryString.indexOf('imageUrl') > -1) {
      const imageUlrChunks = queryString.split('imageUrl');
      const imageUlr = imageUlrChunks[1].substr(1); // remove '='
      query.imageUrl = decodeURIComponent(imageUlr.split('--ImgUrlEnd--')[0]); // take ImgUrl by --ImgUrlEnd--
    }
    return query;
  }

  static pageWasLoaded(callback: () => void) {
    if (document.readyState === 'complete' ||
      document.readyState === 'interactive') {
      callback();
    } else {
      window.onload = () => {
        callback();
      };
    }
  }

  static inIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  // static appendScript(src, callback) {
  //   const script = document.createElement('script') as any;
  //     const  loaded = false;
  //   script.setAttribute('src', src);
  //   if (callback) {
  //     script.onreadystatechange = script.onload = function() {
  //       if (!loaded) {
  //         callback();
  //       }
  //       loaded = true;
  //     };
  //   }
  //   document.getElementsByTagName('head')[0].appendChild(script);
  // }

  static copyToClipboard(text: string) {
    if ((window as any).clipboardData && (window as any).clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return (window as any).clipboardData.setData('Text', text);

    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      const textarea = document.createElement('textarea');
      textarea.textContent = text;
      textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand('copy');  // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn('Copy to clipboard failed.', ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  static buildQueryString(parameters: any): string {
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

  static buildUrl(url, parameters) {
    let qs = '';
    for (const key in parameters) {
      const value = parameters[key];
      qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); // chop off last "&"
      url = url + '?' + qs;
    }
    return url;
  }

  static isEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static getBaseUrl() {

    const getUrl = window.location;
    const baseUrl = getUrl .protocol + '//' + getUrl.host;
    return baseUrl;
  }
}

/**
 * ------------------------------------------------------------------------
 * Google Analytics
 * ------------------------------------------------------------------------
 */

export class GtagExtensions {
  static initGoogleAnalytics(gtagId: string) {
    const element = window.document.querySelector('.google-script');
    if (!element) {
      const script = document.createElement('script');
      script.classList.add('google-script');
      script.setAttribute('async', '');
      script.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=' + gtagId);
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function() {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', gtagId);
    }
  }

  static sendEvent(eventAction: string, eventCategory: string, eventLabel: string, eventValue: number) {
    let obj = {};

    if (eventCategory) {
      obj = {...obj, ...{event_category: eventCategory}};
    }
    if (eventLabel) {
      obj = {...obj, ...{event_label: eventLabel}};
    }
    if (eventValue) {
      obj = {...obj, ...{value: eventValue}};
    }

    (window as any).gtag('event', eventAction, obj);
  }
}

export class HubspotExtensions {
  // <script type="text/javascript" id="hs-script-loader" async defer src="https://js.hs-scripts.com/3319611.js"></script>
  static init(id: string) {
    const element = window.document.querySelector('.hubspot');
    if (!element) {
      const script = document.createElement('script');
      script.classList.add('hubspot');
      script.setAttribute('id', 'hs-script-loader');
      script.setAttribute('async', '');
      script.setAttribute('src', `https://js.hs-scripts.com/${id}.js`);
      document.head.appendChild(script);
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Date
 * ------------------------------------------------------------------------
 */

export class DateExtensions {
  static parse24HoursFromString(time: string): number {
    const arr = time.split(':');
    const result = arr[0];
    if (result) {
      return Number(arr[0]);
    } else {
      return null;
    }
  }

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

  static formatUtcDateTimeToLocalTimezone(dateTime: Date | null): Date | null {
    if (Variable.isNotNullOrUndefined(dateTime)) {
      const res = new Date((new Date(dateTime)).getTime() - (60 * 1000 * new Date().getTimezoneOffset()));
      return res;
    } else {
      return null;
    }
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

/**
 * ------------------------------------------------------------------------
 * Number
 * ------------------------------------------------------------------------
 */

export class NumberExtensions {
  static milesToMeters(i: number): number {
    return i * 0.000621371192;
  }

  static metersToMiles(i: number): number {
    return i * 1609.344;
  }

  static roundNumber(num: number) {
    return Math.round(num * 100) / 100;
  }
}

/**
 * ------------------------------------------------------------------------
 * String
 * ------------------------------------------------------------------------
 */

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

/**
 * ------------------------------------------------------------------------
 * File
 * ------------------------------------------------------------------------
 */

export class FileExtensions {
  static getBase64(file: File, onload: (result: any) => void) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onload(reader.result);
      // console.log(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  static getContentFromBase64(base64string: string): string {
    // data:image/png;base64,iVBORw0KGgoA
    return base64string.split(',')[1];
  }

  static getContentTypeFromBase64(base64string: string): string {
    return base64string.split(';')[0].split(':')[1];
  }

  static getFileSize(file: File): any {
    let size = file.size;
    const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
    let i = 0;
    while (size > 900) {
      size /= 1024;
      i++;
    }
    const exactSize = (Math.round(size * 100) / 100) + ' ' + fSExt[i];
    return exactSize;
  }

}

/**
 * ------------------------------------------------------------------------
 * Password
 * ------------------------------------------------------------------------
 */

export class PasswordExtensions {
  static generatePassword(length: number) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Types
 * ------------------------------------------------------------------------
 */

export interface KeyValueType<T> {
  [key: string]: T;
}
