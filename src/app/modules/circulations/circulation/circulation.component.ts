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
import { AddCirculationComponent } from '../add-circulation/add-circulation.component';
import { EditCirculationComponent } from '../edit-circulation/edit-circulation.component';
import { ContactMemberComponent } from '../contact-member/contact-member.component';

@Component({
    selector: 'app-circulation',
    templateUrl: './circulation.component.html',
    styleUrls: ['./circulation.component.css'],
    standalone: false
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
          this.httpService.menuI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }
  contact(email: string) {
    if (!email) {
      super.show('Warning', 'No email address found for this member', 'warning');
      return;
    }
    const modalRef = this.modalService.open(ContactMemberComponent, { centered: true });
    modalRef.componentInstance.email = email;
    modalRef.componentInstance.circulationI18n = {
      messageI18n: 'Message',
      sendEmailI18n: 'Send Email'
    };
    modalRef.componentInstance.closeModalEvent.subscribe(() => modalRef.close());
    modalRef.result.then(() => {}).catch(() => {});
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(AddCirculationComponent, { size: 'xl', centered: true });
    modalRef.result.then(() => this.getAll()).catch(() => {});
  }

  openEditFromList(id: any): void {
    const modalRef = this.modalService.open(EditCirculationComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.ngOnChanges({});
    modalRef.result.then(() => this.getAll()).catch(() => {});
  }

}
