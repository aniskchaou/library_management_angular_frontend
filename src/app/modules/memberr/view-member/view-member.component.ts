import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css'],
})
export class ViewMemberComponent implements OnInit {
  @Input() id;
  member;
  memberI18n;
  constructor(private httpService: HTTPService) {}

  ngOnInit(): void {
    // this;
  }

  ngOnChanges(changes: any) {
    this.viewMember(this.id);
    this.getMemberByLang(CONFIG.LANG);
  }
  viewMember(id: any) {
    this.httpService.getAll(CONFIG.URL_BASE + '/member/' + id).subscribe(
      (data) => {
        this.member = data;
        //console.log(this.memberI18n);
        //document.getElementById('table').DataTable().ajax.reload();
      },
      (err: HttpErrorResponse) => {
        // super.show('Error', err.message, 'error');
      }
    );
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
        // super.show('Error', err.message, 'error');
      }
    );
  }
}
