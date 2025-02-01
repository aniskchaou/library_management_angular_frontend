import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { saveAs } from 'file-saver';
import 'jspdf-autotable';

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
        const distinctData = Array.from(new Set(data.map(item => JSON.stringify(item))))
        .map(item => JSON.parse(item));

      this.userType$ = distinctData;
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
        const distinctStatus = Array.from(new Set(data.map(item => JSON.stringify(item))))
        .map(item => JSON.parse(item));

      this.status$ = distinctStatus;
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
     console.log(CONFIG.URL_BASE +
      '/member/memberreport/' +
      this.selectedStatus +
      '/' +
      this.selectedUserType)
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
     lang='EN'
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/member/' + lang).subscribe(
      (data) => {
        this.memberI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  exportToCSV() {
    const rows = this.members.map(member => ({
      Name: `${member.firstname} ${member.Becker}`,
      'Type ID': member.typeId,
      Email: member.primary_email,
      Mobile: member.city,
      Address: member.address,
    }));

    const csvContent = [
      ['Name', 'Type ID', 'Email', 'Mobile', 'Address'], // Header row
      ...rows.map(row => Object.values(row)) // Data rows
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'members.csv');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const headers = [['Name', 'Type ID', 'Email', 'Mobile', 'Address']];
    const rows = this.members.map(member => [
      `${member.firstname} ${member.Becker}`,
      member.typeId,
      member.primary_email,
      member.city,
      member.address,
    ]);

    doc.text('Members List', 14, 16);
        // Set column widths
  const colWidths = [40, 30, 50, 30, 60];

  // Draw the table headers
  let x = 14;
  let y = 20;

  headers.forEach((header, index) => {
    doc.text(header, x + colWidths[index] / 2, y);
    x += colWidths[index];
  });

  y += 10; // Move down to start drawing the rows

  // Draw the rows
  rows.forEach(row => {
    x = 14;
    row.forEach((cell, index) => {
      doc.text(cell, x + colWidths[index] / 2, y);
      x += colWidths[index];
    });
    y += 10;
  });
    doc.save('members.pdf');
  }
}
