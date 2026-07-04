import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import MemberTypeMessage from 'src/app/main/messages/TypeMemberMessage';
import MemberTypeTestService from 'src/app/main/mocks/MemberTypeTestService';
import TypeMember from 'src/app/main/models/TypeMember';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { AddTypeMemberComponent } from '../add-type-member/add-type-member.component';

@Component({
    selector: 'app-type-member',
    templateUrl: './type-member.component.html',
    styleUrls: ['./type-member.component.css'],
    standalone: false
})
export class TypeMemberComponent extends URLLoader implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  loading = false;
  typeMembers$;
  id = 0;
  typeMemberI18n;

  constructor(
    private typeMemberTestService: MemberTypeTestService,
    private messageService: MemberTypeMessage,
    private httpService: HTTPService,
    private router: Router,
    private modalService: NgbModal
  ) {
    super();
    super.loadScripts()
  }

  setId(id) {
    this.id = id;
  }

  edit(id) {
    this.setId(id);
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(AddTypeMemberComponent,{size: 'xl', 
            centered: true,});
    modalRef.componentInstance.typeMemeber = {} 

    modalRef.result.then(result => {
      if (result) {
        this.getAll()
      }
    }).catch(() => {});
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/typemember/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  ngOnInit() {
    this.getAll();
    this.getTypeMemberByLang(CONFIG.getInstance().getLang());
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/typemember/all').subscribe(
      (data: TypeMember[]) => {
        this.typeMembers$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/type-member']);
      });
  }

  getTypeMemberByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/typemember/' + lang)
      .subscribe(
        (data) => {
          this.typeMemberI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }
}
