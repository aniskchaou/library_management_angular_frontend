import { UrlSegment } from '@angular/router';

export default class CONFIG {
  static URL_BASE = 'https://librarylab-backend-c5ded9ea6a7c.herokuapp.com';

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
