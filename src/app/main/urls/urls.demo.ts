import { UrlSegment } from '@angular/router';

/**
 * Demo-mode URL config — empty base so all requests go to the demo Node.js
 * server (same origin) where mock data is served.
 */
export default class CONFIG {
  static URL_BASE = '';

  public static instance: CONFIG = null;
  public LANG = 'EN';

  static getInstance(): CONFIG {
    return this.instance || (this.instance = new this());
  }
  public getLang() {
    return this.LANG;
  }

  public setLang(v) {
    this.LANG = v;
  }
}
