import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private refreshData = new Subject<void>();

  // Observable that components can subscribe to
  refreshData$ = this.refreshData.asObservable();

  // Method to trigger the refresh action
  triggerRefresh(): void {
    this.refreshData.next();
  }
}
