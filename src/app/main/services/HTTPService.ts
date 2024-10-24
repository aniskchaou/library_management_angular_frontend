import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Service from '../interfaces/Service';
import CONFIG from '../urls/urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartData, LineChartData } from 'src/app/modules/category/category/category.component';
import { Department } from '../models/Department';
import { NotificationSettings } from '../models/NotificationSettings';
import { PhysicalDescription } from '../models/PhysicalDescription';
import { PurchaseSuggestion } from '../models/PurshaseSuggestion';
import { Fund } from '../models/Fund';
import { Vendor } from '../models/Vendor';
import { Basket } from '../models/Basket';
import { Order } from '../models/Order';
import { Contract } from '../models/Contract';
import { Invoice } from '../models/Invoice';
import { Shelf } from '../models/Shelf';
import { Row } from '../models/Row';
import { BarCode } from '../models/BarCode';
import { QRCode } from '../models/QRcode';
import { Budget } from '../models/Budget';
import { Notice } from '../models/Notice';
import { NoticeTemplate } from '../models/NoticeTemplate';
import { Overdue } from '../models/Overdue';
import Member from '../models/Member';
import { MediaType } from 'src/app/modules/dashboard/dashboard/dashboard.component';
import Publisher from '../models/Publisher';
import Writer from '../models/Writer';



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
    Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
    'content-type': 'application/json'
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

  getDocs(url:string)
  {
   return this.http.get(url, { responseType: 'text' })
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

  getCategoryItemCount(categoryId: number): Observable<number> {
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
    return this.http.get<number>(`${CONFIG.URL_BASE}/categories/${categoryId}/count`,{
      headers: headers,
    });
  }

  getBarChartData(): Observable<ChartData[]> {
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
    return this.http.get<ChartData[]>(`${CONFIG.URL_BASE}/api/charts/bar`,{
      headers: headers,
    });
  }

  getPieChartData(): Observable<ChartData[]> {
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
    return this.http.get<ChartData[]>(`${CONFIG.URL_BASE}/api/charts/pie`,{
      headers: headers,
    });
  }

  getLineChartData(): Observable<LineChartData[]> {
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
    return this.http.get<LineChartData[]>(`${CONFIG.URL_BASE}/api/charts/line`,{
      headers: headers,
    });
  }

  getDoughnutChartData(): Observable<ChartData[]> {
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
    return this.http.get<ChartData[]>(`${CONFIG.URL_BASE}/api/charts/doughnut`,{
      headers: headers,
    });
  }



   // Departments CRUD Methods
   getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${CONFIG.URL_BASE}/department/all`, { headers: this.header });
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${CONFIG.URL_BASE}/department/${id}`, { headers: this.header });
  }

  createDepartment(department: Department): Observable<Department> {
    const body = JSON.stringify(department);
    return this.http.post<Department>(`${CONFIG.URL_BASE}/department/create`, body, { headers: this.header });
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    const body = JSON.stringify(department);
    return this.http.put<Department>(`${CONFIG.URL_BASE}/department/update/${id}`, body, { headers: this.header });
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/department/delete/${id}`, { headers: this.header });
  }

  // NotificationSettings CRUD Methods
  getAllNotificationSettings(): Observable<NotificationSettings[]> {
    return this.http.get<NotificationSettings[]>(`${CONFIG.URL_BASE}/notification-settings/all`, { headers: this.header });
  }

  getNotificationSettingsById(id: number): Observable<NotificationSettings> {
    return this.http.get<NotificationSettings>(`${CONFIG.URL_BASE}/notification-settings/${id}`, { headers: this.header });
  }

  createNotificationSettings(notificationSettings: NotificationSettings): Observable<NotificationSettings> {
    const body = JSON.stringify(notificationSettings);
    return this.http.post<NotificationSettings>(`${CONFIG.URL_BASE}/notification-settings/create`, body, { headers: this.header });
  }

  updateNotificationSettings(id: number, notificationSettings: NotificationSettings): Observable<NotificationSettings> {
    const body = JSON.stringify(notificationSettings);
    return this.http.put<NotificationSettings>(`${CONFIG.URL_BASE}/notification-settings/update/${id}`, body, { headers: this.header });
  }

  deleteNotificationSettings(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/notification-settings/delete/${id}`, { headers: this.header });
  }

  // PhysicalDescription CRUD Methods
  getAllPhysicalDescriptions(): Observable<PhysicalDescription[]> {
    return this.http.get<PhysicalDescription[]>(`${CONFIG.URL_BASE}/physicalDescription/all`, { headers: this.header });
  }

  getPhysicalDescriptionById(id: number): Observable<PhysicalDescription> {
    return this.http.get<PhysicalDescription>(`${CONFIG.URL_BASE}/physicalDescription/${id}`, { headers: this.header });
  }

  createPhysicalDescription(physicalDescription: PhysicalDescription): Observable<PhysicalDescription> {
    const body = JSON.stringify(physicalDescription);
    return this.http.post<PhysicalDescription>(`${CONFIG.URL_BASE}/physicalDescription/create`, body, { headers: this.header });
  }

  updatePhysicalDescription(id: number, physicalDescription: PhysicalDescription): Observable<PhysicalDescription> {
    const body = JSON.stringify(physicalDescription);
    return this.http.put<PhysicalDescription>(`${CONFIG.URL_BASE}/physicalDescription/update/${id}`, body, { headers: this.header });
  }

  deletePhysicalDescription(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/physicalDescription/delete/${id}`, { headers: this.header });
  }

  // PurchaseSuggestion CRUD Methods
  getAllPurchaseSuggestions(): Observable<PurchaseSuggestion[]> {
    return this.http.get<PurchaseSuggestion[]>(`${CONFIG.URL_BASE}/purchase-suggestion/all`, { headers: this.header });
  }

  getPurchaseSuggestionById(id: number): Observable<PurchaseSuggestion> {
    return this.http.get<PurchaseSuggestion>(`${CONFIG.URL_BASE}/purchase-suggestion/${id}`, { headers: this.header });
  }

  createPurchaseSuggestion(purchaseSuggestion: PurchaseSuggestion): Observable<PurchaseSuggestion> {
    const body = JSON.stringify(purchaseSuggestion);
    return this.http.post<PurchaseSuggestion>(`${CONFIG.URL_BASE}/purchase-suggestion/create`, body, { headers: this.header });
  }

  updatePurchaseSuggestion(id: number, purchaseSuggestion: PurchaseSuggestion): Observable<PurchaseSuggestion> {
    const body = JSON.stringify(purchaseSuggestion);
    return this.http.put<PurchaseSuggestion>(`${CONFIG.URL_BASE}/purchase-suggestion/update/${id}`, body, { headers: this.header });
  }

  deletePurchaseSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/purchase-suggestion/delete/${id}`, { headers: this.header });
  }

  // Fund CRUD Methods
  getAllFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(`${CONFIG.URL_BASE}/fund/all`, { headers: this.header });
  }

  getFundById(id: number): Observable<Fund> {
    return this.http.get<Fund>(`${CONFIG.URL_BASE}/fund/${id}`, { headers: this.header });
  }

  createFund(fund: Fund): Observable<Fund> {
    const body = JSON.stringify(fund);
    return this.http.post<Fund>(`${CONFIG.URL_BASE}/fund/create`, body, { headers: this.header });
  }

  updateFund(id: number, fund: Fund): Observable<Fund> {
    const body = JSON.stringify(fund);
    return this.http.put<Fund>(`${CONFIG.URL_BASE}/fund/update/${id}`, body, { headers: this.header });
  }

  deleteFund(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/fund/delete/${id}`, { headers: this.header });
  }

  // Vendor CRUD Methods
  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${CONFIG.URL_BASE}/vendor/all`, { headers: this.header });
  }

  getVendorById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${CONFIG.URL_BASE}/vendor/${id}`, { headers: this.header });
  }

  createVendor(vendor: Vendor): Observable<Vendor> {
    const body = JSON.stringify(vendor);
    return this.http.post<Vendor>(`${CONFIG.URL_BASE}/vendor/create`, body, { headers: this.header });
  }

  updateVendor(id: number, vendor: Vendor): Observable<Vendor> {
    const body = JSON.stringify(vendor);
    return this.http.put<Vendor>(`${CONFIG.URL_BASE}/vendor/update/${id}`, body, { headers: this.header });
  }

  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/vendor/delete/${id}`, { headers: this.header });
  }

  // Basket CRUD Methods
  getAllBaskets(): Observable<Basket[]> {
    return this.http.get<Basket[]>(`${CONFIG.URL_BASE}/basket/all`, { headers: this.header });
  }

  getBasketById(id: number): Observable<Basket> {
    return this.http.get<Basket>(`${CONFIG.URL_BASE}/basket/${id}`, { headers: this.header });
  }

  createBasket(basket: Basket): Observable<Basket> {
    const body = JSON.stringify(basket);
    return this.http.post<Basket>(`${CONFIG.URL_BASE}/basket/create`, body, { headers: this.header });
  }

  updateBasket(id: number, basket: Basket): Observable<Basket> {
    const body = JSON.stringify(basket);
    return this.http.put<Basket>(`${CONFIG.URL_BASE}/basket/update/${id}`, body, { headers: this.header });
  }

  deleteBasket(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/basket/delete/${id}`, { headers: this.header });
  }

  // Order CRUD Methods
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${CONFIG.URL_BASE}/order/all`, { headers: this.header });
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${CONFIG.URL_BASE}/order/${id}`, { headers: this.header });
  }

  createOrder(order: Order): Observable<Order> {
    const body = JSON.stringify(order);
    return this.http.post<Order>(`${CONFIG.URL_BASE}/order/create`, body, { headers: this.header });
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    const body = JSON.stringify(order);
    return this.http.put<Order>(`${CONFIG.URL_BASE}/order/update/${id}`, body, { headers: this.header });
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/order/delete/${id}`, { headers: this.header });
  }

  // Contract CRUD Methods
  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${CONFIG.URL_BASE}/contract/all`, { headers: this.header });
  }

  getContractById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${CONFIG.URL_BASE}/contract/${id}`, { headers: this.header });
  }

  createContract(contract: Contract): Observable<Contract> {
    const body = JSON.stringify(contract);
    return this.http.post<Contract>(`${CONFIG.URL_BASE}/contract/create`, body, { headers: this.header });
  }

  updateContract(id: number, contract: Contract): Observable<Contract> {
    const body = JSON.stringify(contract);
    return this.http.put<Contract>(`${CONFIG.URL_BASE}/contract/update/${id}`, body, { headers: this.header });
  }

  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/contract/delete/${id}`, { headers: this.header });
  }

  // Invoice CRUD Methods
  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${CONFIG.URL_BASE}/invoice/all`, { headers: this.header });
  }

  getInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${CONFIG.URL_BASE}/invoice/${id}`, { headers: this.header });
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    const body = JSON.stringify(invoice);
    return this.http.post<Invoice>(`${CONFIG.URL_BASE}/invoice/create`, body, { headers: this.header });
  }

  updateInvoice(id: number, invoice: Invoice): Observable<Invoice> {
    const body = JSON.stringify(invoice);
    return this.http.put<Invoice>(`${CONFIG.URL_BASE}/invoice/update/${id}`, body, { headers: this.header });
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/invoice/delete/${id}`, { headers: this.header });
  }






  getAllShelves(): Observable<Shelf[]> {
    return this.http.get<Shelf[]>(`${CONFIG.URL_BASE}/shelf/all`, { headers: this.header });
  }

  getShelfById(id: number): Observable<Shelf> {
    return this.http.get<Shelf>(`${CONFIG.URL_BASE}/shelf/${id}`, { headers: this.header });
  }

  createShelf(shelf: Shelf): Observable<Shelf> {
    const body = JSON.stringify(shelf);
    return this.http.post<Shelf>(`${CONFIG.URL_BASE}/shelf/create`, body, { headers: this.header });
  }

  updateShelf(id: number, shelf: Shelf): Observable<Shelf> {
    const body = JSON.stringify(shelf);
    return this.http.put<Shelf>(`${CONFIG.URL_BASE}/shelf/update/${id}`, body, { headers: this.header });
  }

  deleteShelf(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/shelf/delete/${id}`, { headers: this.header });
  }


  




  getAllRows(): Observable<Row[]> {
    return this.http.get<Row[]>(`${CONFIG.URL_BASE}/row/all`, { headers: this.header });
  }

  getRowById(id: number): Observable<Shelf> {
    return this.http.get<Shelf>(`${CONFIG.URL_BASE}/row/${id}`, { headers: this.header });
  }

  createRow(row: Row): Observable<Shelf> {
    const body = JSON.stringify(row);
    return this.http.post<Shelf>(`${CONFIG.URL_BASE}/row/create`, body, { headers: this.header });
  }

  updateRow(id: number, row: Row): Observable<Shelf> {
    const body = JSON.stringify(row);
    return this.http.put<Shelf>(`${CONFIG.URL_BASE}/row/update/${id}`, body, { headers: this.header });
  }

  deleteRow(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/row/delete/${id}`, { headers: this.header });
  }


  getAllBarCodes(): Observable<BarCode[]> {
    return this.http.get<BarCode[]>(`${CONFIG.URL_BASE}/barcode/all`, { headers: this.header });
  }

  getBarCodeById(id: number): Observable<Shelf> {
    return this.http.get<Shelf>(`${CONFIG.URL_BASE}/barcode/${id}`, { headers: this.header });
  }

  createBarCode(barcode: BarCode): Observable<Shelf> {
    const body = JSON.stringify(barcode);
    return this.http.post<Shelf>(`${CONFIG.URL_BASE}/barcode/create`, body, { headers: this.header });
  }

  updateBarCode(id: number, barcode: BarCode): Observable<Shelf> {
    const body = JSON.stringify(barcode);
    return this.http.put<Shelf>(`${CONFIG.URL_BASE}/barcode/update/${id}`, body, { headers: this.header });
  }

  deleteBarCode(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/barcode/delete/${id}`, { headers: this.header });
  }

  getAllQrCodes(): Observable<QRCode[]> {
    return this.http.get<QRCode[]>(`${CONFIG.URL_BASE}/qrcode/all`, { headers: this.header });
  }

  // Fetch a specific QR code by ID
  getQrCodeById(id: number): Observable<QRCode> {
    return this.http.get<QRCode>(`${CONFIG.URL_BASE}/qrcode/${id}`, { headers: this.header });
  }

  // Create a new QR code
  createQrCode(qrCode: QRCode): Observable<QRCode> {
    const body = JSON.stringify(qrCode);
    return this.http.post<QRCode>(`${CONFIG.URL_BASE}/qrcode/create`, body, { headers: this.header });
  }

  // Update an existing QR code
  updateQrCode(id: number, qrCode: QRCode): Observable<QRCode> {
    const body = JSON.stringify(qrCode);
    return this.http.put<QRCode>(`${CONFIG.URL_BASE}/qrcode/update/${id}`, body, { headers: this.header });
  }

  // Delete a QR code by ID
  deleteQrCode(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/qrcode/delete/${id}`, { headers: this.header });
  }

  








  getAllBudget(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${CONFIG.URL_BASE}/budget/all`, { headers: this.header });
  }

  // Fetch a specific QR code by ID
  getBudgetById(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${CONFIG.URL_BASE}/budget/${id}`, { headers: this.header });
  }

  // Create a new QR code
  createBudget(budget: Budget): Observable<Budget> {
    const body = JSON.stringify(budget);
    return this.http.post<Budget>(`${CONFIG.URL_BASE}/budget/create`, body, { headers: this.header });
  }

  // Update an existing QR code
  updateBudget(id: number, budget: Budget): Observable<Budget> {
    const body = JSON.stringify(budget);
    return this.http.put<Budget>(`${CONFIG.URL_BASE}/budget/update/${id}`, body, { headers: this.header });
  }

  // Delete a QR code by ID
  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/budget/delete/${id}`, { headers: this.header });
  }

  getAllNotice(): Observable<Notice[]> {
    return this.http.get<Notice[]>(`${CONFIG.URL_BASE}/notice/all`, { headers: this.header });
  }
  
  // Fetch a specific Notice by ID
  getNoticeById(id: number): Observable<Notice> {
    return this.http.get<Notice>(`${CONFIG.URL_BASE}/notice/${id}`, { headers: this.header });
  }
  
  // Create a new Notice
  createNotice(notice: Notice): Observable<Notice> {
    const body = JSON.stringify(notice);
    return this.http.post<Notice>(`${CONFIG.URL_BASE}/notice/create`, body, { headers: this.header });
  }
  
  // Update an existing Notice
  updateNotice(id: number, notice: Notice): Observable<Notice> {
    const body = JSON.stringify(notice);
    return this.http.put<Notice>(`${CONFIG.URL_BASE}/notice/update/${id}`, body, { headers: this.header });
  }
  
  // Delete a Notice by ID
  deleteNotice(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/notice/delete/${id}`, { headers: this.header });
  }
  getAllNoticeTemplate(): Observable<NoticeTemplate[]> {
    return this.http.get<NoticeTemplate[]>(`${CONFIG.URL_BASE}/noticetemplate/all`, { headers: this.header });
  }
  
  // Fetch a specific NoticeTemplate by ID
  getNoticeTemplateById(id: number): Observable<NoticeTemplate> {
    return this.http.get<NoticeTemplate>(`${CONFIG.URL_BASE}/noticetemplate/${id}`, { headers: this.header });
  }
  
  // Create a new NoticeTemplate
  createNoticeTemplate(noticeTemplate: NoticeTemplate): Observable<NoticeTemplate> {
    const body = JSON.stringify(noticeTemplate);
    return this.http.post<NoticeTemplate>(`${CONFIG.URL_BASE}/noticetemplate/create`, body, { headers: this.header });
  }
  
  // Update an existing NoticeTemplate
  updateNoticeTemplate(id: number, noticeTemplate: NoticeTemplate): Observable<NoticeTemplate> {
    const body = JSON.stringify(noticeTemplate);
    return this.http.put<NoticeTemplate>(`${CONFIG.URL_BASE}/noticetemplate/update/${id}`, body, { headers: this.header });
  }
  
  // Delete a NoticeTemplate by ID
  deleteNoticeTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/noticetemplate/delete/${id}`, { headers: this.header });
  }

  getAllOverdue(): Observable<Overdue[]> {
    return this.http.get<Overdue[]>(`${CONFIG.URL_BASE}/overdue/all`, { headers: this.header });
  }
  
  // Fetch a specific Overdue by ID
  getOverdueById(id: number): Observable<Overdue> {
    return this.http.get<Overdue>(`${CONFIG.URL_BASE}/overdue/${id}`, { headers: this.header });
  }
  
  // Create a new Overdue
  createOverdue(overdue: Overdue): Observable<Overdue> {
    const body = JSON.stringify(overdue);
    return this.http.post<Overdue>(`${CONFIG.URL_BASE}/overdue/create`, body, { headers: this.header });
  }
  
  // Update an existing Overdue
  updateOverdue(id: number, overdue: Overdue): Observable<Overdue> {
    const body = JSON.stringify(overdue);
    return this.http.put<Overdue>(`${CONFIG.URL_BASE}/overdue/update/${id}`, body, { headers: this.header });
  }
  
  // Delete an Overdue by ID
  deleteOverdue(id: number): Observable<void> {
    return this.http.delete<void>(`${CONFIG.URL_BASE}/overdue/delete/${id}`, { headers: this.header });
  }

  getMembersByUserType(): Observable<any[]> {
    return this.http.get<any[]>(`${CONFIG.URL_BASE}/member/members-by-user-type`, { headers: this.header });
  }

  // Get gender distribution of members
  getMembersByGender(): Observable<any[]> {
    return this.http.get<any[]>(`${CONFIG.URL_BASE}/member/members-by-gender`, { headers: this.header });
  }

  // Get age distribution of members
  getMembersByAge(): Observable<any[]> {
    return this.http.get<any[]>(`${CONFIG.URL_BASE}/member/members-by-age`, { headers: this.header });
  }

  // Get number of members by city
  getMembersByCity(): Observable<any[]> {
    return this.http.get<any[]>(`${CONFIG.URL_BASE}/member/members-by-city`, { headers: this.header });
  }

  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

 // constructor(private http: HttpClient) {}

  // Method to fetch book data from Google Books API
  getBookByISBN(isbn: string): Observable<any> {
    const url = `${this.googleBooksApiUrl}${isbn}`;
    return this.http.get(url);
  }

  private openLibraryApiUrl = 'https://openlibrary.org/search.json?isbn=';

  //constructor(private http: HttpClient) {}

  // Method to fetch book data from Open Library API
  getBookByISBNOpenLibrary(isbn: string): Observable<any> {
    const url = `${this.openLibraryApiUrl}${isbn}`;
    console.log(url)
    return this.http.get(url);
  }

  private locApiUrl = 'https://www.loc.gov/search/?q=';

  //constructor(private http: HttpClient) {}

  // Method to fetch book data from Library of Congress API
  getBookByISBNCongressLibrary(isbn: string): Observable<any> {
    const url = `${this.locApiUrl}${isbn}&fo=json`;
    return this.http.get(url);
  }

  private apiUrl = CONFIG.URL_BASE+'/circulation/update-status';

  //constructor(private http: HttpClient) {}

  updateCirculationStatus(catalogItemId: string, memberId: string, statusName: string): Observable<any> {
    const params = new HttpParams()
      .set('catalogItemId', catalogItemId)
      .set('memberId', memberId)
      .set('statusName', statusName);
       console.log(params)
    return this.http.put(CONFIG.URL_BASE+'/circulation/update-status', null, { headers: this.header,params:params,responseType: 'text'  });
  }
  

  getItemsByCategory(): Observable<any> {
    return this.http.get(`${CONFIG.URL_BASE}/book/category-chart`,{ headers: this.header });
  }

  getItemsByMediaType(): Observable<any> {
    return this.http.get(`${CONFIG.URL_BASE}/book/media-type-chart`,{ headers: this.header });
  }

  getItemsByPublishingYear(): Observable<any> {
    return this.http.get(`${CONFIG.URL_BASE}/book/publishing-year-chart`,{ headers: this.header });
  }

  getItemsByStatus(): Observable<any> {
    return this.http.get(`${CONFIG.URL_BASE}/book/status-chart`,{ headers: this.header });
  }

  getNewArrivals(): Observable<Member[]> {
    return this.http.get<Member[]>(`${CONFIG.URL_BASE}/member/new-arrivals`,{ headers: this.header });
  }

  // Get unverified accounts
  getUnverifiedAccounts(): Observable<Member[]> {
    return this.http.get<Member[]>(`${CONFIG.URL_BASE}/member/unverified`,{ headers: this.header });
  }

  // Get blocked members
  getBlockedMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${CONFIG.URL_BASE}/member/blocked`,{ headers: this.header });
  }

  // Get expired accounts
  getExpiredAccounts(): Observable<Member[]> {
    return this.http.get<Member[]>(`${CONFIG.URL_BASE}/member/expired`,{ headers: this.header });
  }

  getCirculationsByMemberType(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${CONFIG.URL_BASE}/circulation/member-type`,{ headers: this.header });
  }

  getBorrowedItemsByCategory(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${CONFIG.URL_BASE}/circulation/borrowed-items-category`,{ headers: this.header });
  }

  getTotalPenalties(): Observable<number> {
    return this.http.get<number>(`${CONFIG.URL_BASE}/circulation/total-penalties`,{ headers: this.header });
  }

  getCirculationStatusDistribution(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${CONFIG.URL_BASE}/circulation/status-distribution`,{ headers: this.header });
  }

    // Fetch top authors
    getTopAuthors(): Observable<any[]> {
      return this.http.get<any[]>(`${CONFIG.URL_BASE}/book/top-authors`,{ headers: this.header });
    }
  
    // Fetch top publications
    getTopPublications(): Observable<any[]> {
      return this.http.get<any[]>(`${CONFIG.URL_BASE}/book/top-publications`,{ headers: this.header });
    }
  
    // Fetch most popular genres
    getMostPopularGenres(): Observable<any[]> {
      return this.http.get<any[]>(`${CONFIG.URL_BASE}/book/most-popular-genres`,{ headers: this.header });
    }
  
    // Fetch top circulating books
    getTopCirculatingBooks(): Observable<any[]> {
      return this.http.get<any[]>(`${CONFIG.URL_BASE}/book/top-circulating-books`,{ headers: this.header });
    }
  
    // Fetch top book series
    getTopBookSeries(): Observable<any[]> {
      return this.http.get<any[]>(`${CONFIG.URL_BASE}/book/top-book-series`,{ headers: this.header });
    }

      // Fetch all writers
  getWriters(): Observable<Writer[]> {
    return this.http.get<Writer[]>(`${CONFIG.URL_BASE}/writer/all`, { headers: this.header });
  }

  // Fetch all publishers
  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${CONFIG.URL_BASE}/publisher/all`, { headers: this.header });
  }

  // Fetch all departments
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${CONFIG.URL_BASE}/department/all`, { headers: this.header });
  }

  // Fetch all shelves
  getShelves(): Observable<Shelf[]> {
    return this.http.get<Shelf[]>(`${CONFIG.URL_BASE}/shelf/all`, { headers: this.header });
  }

  // Fetch all rows
  getRows(): Observable<Row[]> {
    return this.http.get<Row[]>(`${CONFIG.URL_BASE}/row/all`, { headers: this.header });
  }

  // Fetch all media types
  getMediaTypes(): Observable<MediaType[]> {
    return this.http.get<MediaType[]>(`${CONFIG.URL_BASE}/mediatype/all`, { headers: this.header });
  }

  getPhysicalDescriptions(): Observable<MediaType[]> {
    return this.http.get<MediaType[]>(`${CONFIG.URL_BASE}/physicalDescription/all`, { headers: this.header });
  }

  getBookStatuses(): Observable<MediaType[]> {
    return this.http.get<MediaType[]>(`${CONFIG.URL_BASE}/book_status/all`, { headers: this.header });
  }

  getCategories(): Observable<MediaType[]> {
    return this.http.get<MediaType[]>(`${CONFIG.URL_BASE}/category/all`, { headers: this.header });
  }
    
}
