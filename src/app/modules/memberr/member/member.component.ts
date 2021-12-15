import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import MemberMessage from 'src/app/main/messages/MemberMessage';
import MemberTestService from 'src/app/main/mocks/MemberTestService';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent extends URLLoader implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  members$;
  id = 0;
  memberI18n;

  constructor(
    private memberTestService: MemberTestService,
    private messageService: MemberMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
  }

  getMemberByLang(lang) {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/member/' + lang).subscribe(
      (data) => {
        this.memberI18n = data;
        console.log(this.memberI18n);
        //document.getElementById('table').DataTable().ajax.reload();
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  setId(id) {
    this.id = id;
  }

  edit(id) {
    this.setId(id);
    //this.memberTestService.ID.next(id.toString());
  }

  view(id) {
    this.setId(id);
  }

  ngOnInit() {
    //super.loadScripts();
    this.getAll();
    this.getMemberByLang(CONFIG.LANG);
  }
  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/member']);
      });
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      /* this.categoryTestService.remove(parseInt(id));
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );*/
      this.httpService.remove(CONFIG.URL_BASE + '/member/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  /*getAll() {
    this.members$ = this.memberTestService.getAll()

  }*/

  getAll() {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/member/all').subscribe(
      (data: Member[]) => {
        this.members$ = data;
        // console.log(this.books$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
