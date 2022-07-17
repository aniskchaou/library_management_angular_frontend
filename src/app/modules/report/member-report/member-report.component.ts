import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrls: ['./member-report.component.css'],
})
export class MemberReportComponent extends URLLoader implements OnInit {
  searchButtonClicked: boolean = false;
  memberI18n: Object;
  menu;
  loading: boolean = false;
  constructor(private httpService: HTTPService) {
    super();
  }
  selectedUserType;
  selectedStatus;
  members;
  ngOnInit(): void {
    this.searchButtonClicked = false;
    this.getStatus();
    this.getUserType();
    this.getMemberByLang(CONFIG.getInstance().getLang());
    this.httpService.menuI18n$.subscribe((data) => {
      this.menu = data;
    });
  }
  status$;
  userType$;

  getUserType() {
    this.httpService.getAll(CONFIG.URL_BASE + '/member/usertype').subscribe(
      (data: Member[]) => {
        this.userType$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getStatus() {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/member/status').subscribe(
      (data: Member[]) => {
        this.status$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
  selectUserType(userType) {
    this.selectedUserType = userType;
  }
  selectStatus(status) {
    this.selectedStatus = status;
  }

  search() {
    this.searchButtonClicked = true;
    this.loadScripts();
    // this.loading = true;

    this.httpService
      .getAll(
        CONFIG.URL_BASE +
          '/member/memberreport/' +
          this.selectedStatus +
          '/' +
          this.selectedUserType
      )
      .subscribe(
        (data: Member[]) => {
          this.members = data;
          // this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getMemberByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/member/' + lang).subscribe(
      (data) => {
        this.memberI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
