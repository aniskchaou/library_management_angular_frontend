import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from '../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = CONFIG.URL_BASE+'/member/upload'; // URL to Spring Boot backend

  constructor(private http: HttpClient) { }

  header = new HttpHeaders({
    Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
    'enctype': 'multipart/form-data'
  });
  upload(formData): Observable<HttpEvent<any>> {
    //const formData: FormData = new FormData();
    //formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'text',
      headers:this.header
    });

    return this.http.request(req);
  }

  uploadContract(vendorid,formData): Observable<HttpEvent<any>> {
    //const formData: FormData = new FormData();
    //formData.append('file', file);

    const req = new HttpRequest('POST', CONFIG.URL_BASE+'/contract/upload?vendorId='+vendorid, formData, {
      reportProgress: true,
      responseType: 'text',
      headers:this.header
    });

    return this.http.request(req);
  }

  uploadMember(memberid,formData): Observable<HttpEvent<any>> {
    //const formData: FormData = new FormData();
    //formData.append('file', file);

    const req = new HttpRequest('POST', CONFIG.URL_BASE+'/member/upload?memberId='+memberid, formData, {
      reportProgress: true,
      responseType: 'text',
      headers:this.header
    });

    return this.http.request(req);
  }

  uploadProfileImage(useranme,formData): Observable<HttpEvent<any>> {
    //const formData: FormData = new FormData();
    //formData.append('file', file);

    const req = new HttpRequest('POST', CONFIG.URL_BASE+'/users/upload?username='+useranme, formData, {
      reportProgress: true,
      responseType: 'text',
      headers:this.header
    });

    return this.http.request(req);
  }

  uploadlogo(formData): Observable<HttpEvent<any>> {
    //const formData: FormData = new FormData();
    //formData.append('file', file);

    const req = new HttpRequest('POST', CONFIG.URL_BASE+'/version/upload', formData, {
      reportProgress: true,
      responseType: 'text',
      headers:this.header
    });

    return this.http.request(req);
  }

  uploadImageCover(bookId,imageName,formData): Observable<HttpEvent<any>> {
    //const formData: FormData = new FormData();
    //formData.append('file', file);
    console.log(CONFIG.URL_BASE+'/book/upload/'+bookId+'/'+imageName)
    const req = new HttpRequest('POST', CONFIG.URL_BASE+'/book/upload/'+bookId+'/'+imageName, formData, {
      reportProgress: true,
      responseType: 'text',
      headers:this.header
    });

    return this.http.request(req);
  }
}
