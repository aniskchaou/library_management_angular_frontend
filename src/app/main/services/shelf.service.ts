import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from '../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  private apiUrl = CONFIG.URL_BASE+'/shelf'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllShelves(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/all');
  }

  getShelfById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createShelf(shelf: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/create', shelf);
  }

  updateShelf(shelf: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/update/' + shelf.id, shelf);
  }

  deleteShelf(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
