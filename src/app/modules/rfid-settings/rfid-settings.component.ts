import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-rfid-settings',
  templateUrl: './rfid-settings.component.html',
  standalone: false,
})
export class RfidSettingsComponent {

  readerStatus: any = null;
  checkingStatus = false;
  scanResult: any = null;
  epcInput = '';
  barcodeInput = '';
  registerResult: any = null;

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') });
  }

  constructor(private http: HttpClient) {}

  checkReader(): void {
    this.checkingStatus = true;
    this.http.get(`${CONFIG.URL_BASE}/rfid/reader/status`, { headers: this.headers })
      .subscribe({
        next: d => { this.readerStatus = d; this.checkingStatus = false; },
        error: () => { this.checkingStatus = false; }
      });
  }

  registerTag(): void {
    if (!this.epcInput || !this.barcodeInput) return;
    this.http.post(`${CONFIG.URL_BASE}/rfid/tag/register`,
      { epc: this.epcInput, barcode: this.barcodeInput }, { headers: this.headers })
      .subscribe({
        next: d => { this.registerResult = d; },
        error: () => { this.registerResult = { error: 'Registration failed' }; }
      });
  }
}
