import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CONFIG from '../urls/urls';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username, password) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.httpClient
      .get(CONFIG.URL_BASE + '/member/all', { headers })
      .pipe((userData) => {
        // localStorage.setItem('username', username);
        //localStorage.setItem('password', password);
        return userData;
      });
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    if (user == null) {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
