import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Service from '../interfaces/Service';
import CONFIG from '../urls/urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HTTPService implements Service {
  menuI18n = new BehaviorSubject<Object>(undefined);
  menuI18n$ = this.menuI18n.asObservable();
  dashboardI18n = new BehaviorSubject<Object>(undefined);
  dashboardI18n$ = this.dashboardI18n.asObservable();
  categoryI18n = new BehaviorSubject<Object>(undefined);
  categoryI18n$ = this.categoryI18n.asObservable();
  public ID = new BehaviorSubject<string>(null);
  headers = { 'content-type': 'application/json' };
  model = '';
  header = new HttpHeaders({
    Authorization: 'Basic ' + btoa('admin' + ':' + 'admin'),
  });
  paymentI18n$: any;
  constructor(private http: HttpClient) {}
  async update(url, data) {
    await this.http.put(url, data);
  }
  getAll(url: string) {
    console.log(sessionStorage.getItem('password'));
    return this.http.get(url, { headers: this.header });
  }

  put(url: string) {
    console.log(sessionStorage.getItem('password'));
    return this.http.put(url, {}, { headers: this.header });
  }

  getAllLang(url: string, username: string, password: string) {
    let header = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get(url, { headers: header });
  }
  get(id: string) {
    return this.http.get(id, { headers: this.header });
  }
  async create(url, data) {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization:
        'Basic ' +
        btoa(
          sessionStorage.getItem('username') +
            ':' +
            sessionStorage.getItem('password')
        ),
    });
    await this.http.post(url, body, { headers: headers }).toPromise();
  }

  async filter(url, data) {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization:
        'Basic ' +
        btoa(
          sessionStorage.getItem('username') +
            ':' +
            sessionStorage.getItem('password')
        ),
    });
    await this.http.post(url, body, { headers: headers }).toPromise();
  }

  async remove(url) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization:
        'Basic ' +
        btoa(
          sessionStorage.getItem('username') +
            ':' +
            sessionStorage.getItem('password')
        ),
    });
    await this.http
      .delete(url, {
        headers: headers,
      })
      .toPromise();
  }
}
