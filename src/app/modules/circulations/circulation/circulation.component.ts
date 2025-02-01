import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CirculationMessage from 'src/app/main/messages/CirculationMessage';
import Circulation from 'src/app/main/models/Circulation';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { ViewCirculationComponent } from '../view-circulation/view-circulation.component';
import { RenewComponent } from '../renew/renew.component';
import { HoldComponent } from '../hold/hold.component';
import { CheckInComponent } from '../check-in/check-in.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { DataService } from 'src/app/main/services/data.service';

@Component({
  selector: 'app-circulation',
  templateUrl: './circulation.component.html',
  styleUrls: ['./circulation.component.css'],
})
export class CirculationComponent extends URLLoader implements OnInit {
  circulations$ = [];
  id;
  circulationI18n;
  loading = false;
  email;
  edit(id) {
    if (id != undefined) {
      this.id = id;
    }
  }

  getCirculationByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/circulation/' + lang)
      .subscribe(
        (data) => {
          this.circulationI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  view(id) {
    this.id = id;
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/circulation']);
      });
  }

  delete(id) {
    this.httpService.remove(CONFIG.URL_BASE + '/circulation/delete/' + id);
    super.show(
      'Confirmation',
      this.messageService.confirmationMessages.delete,
      'success'
    );
    this.reloadPage();
  }

  constructor(
    private httpService: HTTPService,
    private messageService: CirculationMessage,
    private router: Router,
    private modalService: NgbModal,
    private dataService:DataService
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAll();
    this.getCirculationByLang(CONFIG.getInstance().getLang());
    this.getMenuByLang(
      CONFIG.getInstance().getLang(),
      localStorage.getItem('username'),
      localStorage.getItem('password')
    );

    this.dataService.refreshData$.subscribe(() => {
      this.getAll();  // Trigger the getAll() method when notified
    });
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/circulation/all').subscribe(
      (data: Circulation[]) => {
        this.circulations$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getMenuByLang(lang, username, password) {
     lang='EN'
    this.httpService
      .getAllLang(CONFIG.URL_BASE + '/i18n/menu/EN', username, password)
      .subscribe(
        (data) => {
          console.log(data);
          this.httpService.menuI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }
  contact(email) {
    this.email = email;
    console.log(email);
  }

}
