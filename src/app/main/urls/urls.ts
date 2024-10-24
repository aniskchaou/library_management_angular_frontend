import { UrlSegment } from '@angular/router';

export default class CONFIG {
  static URL_BASE = 'http://localhost:8080';

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
