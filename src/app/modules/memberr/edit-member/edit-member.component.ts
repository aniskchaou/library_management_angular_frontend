import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import MemberMessage from 'src/app/main/messages/MemberMessage';
import MemberTestService from 'src/app/main/mocks/MemberTestService';

import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
})
export class EditMemberComponent extends URLLoader implements OnInit {
  model: Member = new Member(0, '', '', '', '', '', '', '', '');
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  memberI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private memberTestService: MemberTestService,
    private message: MemberMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.model = new Member(0, '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    /*  this.memberTestService.ID.subscribe((idd) => {
      this.model = this.memberTestService.get(idd);
      if (this.model == undefined) {
        this.model = new Member(0, '', '', '', '', '', '', '', '');
      }
    });*/
    this.getMemberByLang(CONFIG.LANG);
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

  ngOnChanges(changes: any) {
    console.log('jkv');
    this.httpService
      .get(CONFIG.URL_BASE + '/member/' + this.id)
      .subscribe((data: Member) => {
        this.model = data;
        console.log(this.model);
      });
  }

  edit() {
    /* this.memberTestService.update(this.model);
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );*/

    this.httpService.create(CONFIG.URL_BASE + '/member/create', this.model);
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
    this.reloadPage();
    this.closeModal();
  }
  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/member']);
      });
  }
}
