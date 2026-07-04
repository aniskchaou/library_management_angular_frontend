import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import MemberMessage from 'src/app/main/messages/MemberMessage';
import MemberTestService from 'src/app/main/mocks/MemberTestService';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { AddMemberComponent } from '../add-member/add-member.component';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css'],
    standalone: false
})
export class MemberComponent extends URLLoader implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  members$;
  id = 0;
  memberI18n;
  loading = false;
  newArrivals: number;
  unverified: number;
  blacklist: number;
  expired: number;

  constructor(
    private toastr: ToastrService,
    private memberTestService: MemberTestService,
    private messageService: MemberMessage,
    private httpService: HTTPService,
    private router: Router,
    private modalService: NgbModal
  ) {
    super();
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(AddMemberComponent, { size: 'xl', centered: true });
    modalRef.result.then(() => this.getAll()).catch(() => {});
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

  setId(id) {
    this.id = id;
  }

  edit(id) {
    this.setId(id);
  }

  view(id) {
    this.setId(id);
  }

  ngOnInit() {
    this.getAll();
    this.getMemberByLang(CONFIG.getInstance().getLang());
    this.loadBlockedMembers()
    this.loadExpiredAccounts()
    this.loadNewArrivals()
    this.loadUnverifiedAccounts()
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/member']);
      });
  }

  /* delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/member/delete/' + id).finally(()=>{
        this.toastr.success('Item removed successfully!', 'Success');
      });
  
 
    }
  } */
  delete(id: number): void {
    const r = confirm('Do you want to delete this recording?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/member/delete/' + id)
        .then(() => {
          // This block will run if the request was successful
          this.toastr.success('Item removed successfully!', 'Success');
          this.getAll();  // Refresh the list after deletion
        })
        .catch((err) => {
          // This block will run if there is an error in the request
          this.toastr.error('Error removing item', 'Error');
        })
        .finally(() => {
          // This block runs when the request finishes (either success or failure)
          // You could do additional cleanup actions if needed
        });
    }
  }
  
  
  

  loadNewArrivals(): void {
    this.httpService.getNewArrivals().subscribe(
      data => this.newArrivals = data.length,
      error => console.error('Error fetching new arrivals:', error)
    );
  }

  loadUnverifiedAccounts(): void {
    this.httpService.getUnverifiedAccounts().subscribe(
      data => this.unverified = data.length,
      error => console.error('Error fetching unverified accounts:', error)
    );
  }

  loadBlockedMembers(): void {
    this.httpService.getBlockedMembers().subscribe(
      data => this.blacklist = data.length,
      error => console.error('Error fetching blocked members:', error)
    );
  }

  loadExpiredAccounts(): void {
    this.httpService.getExpiredAccounts().subscribe(
      data => this.expired = data.length,
      error => console.error('Error fetching expired accounts:', error)
    );
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/member/all').subscribe(
      (data: Member[]) => {
        this.members$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
