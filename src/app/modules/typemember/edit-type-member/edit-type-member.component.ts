import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import TypeMemberMessage from 'src/app/main/messages/TypeMemberMessage';
import MemberTypeTestService from 'src/app/main/mocks/MemberTypeTestService';
import Publisher from 'src/app/main/models/Publisher';
import TypeMember from 'src/app/main/models/TypeMember';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-type-member',
  templateUrl: './edit-type-member.component.html',
  styleUrls: ['./edit-type-member.component.css'],
})
export class EditTypeMemberComponent extends URLLoader implements OnInit {
  model;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  typeMemberI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private typeMemberTestService: HTTPService,
    private message: TypeMemberMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.model = new TypeMember(0, '');
  }

  ngOnInit(): void {
    this.getTypeMemberByLang(CONFIG.LANG);
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/type-member']);
      });
  }

  ngOnChanges(changes: any) {
    this.httpService
      .get(CONFIG.URL_BASE + '/typemember/' + this.id)
      .subscribe((data: Publisher) => {
        this.model = data;
        console.log(this.model);
      });
  }

  edit() {
    this.httpService.create(CONFIG.URL_BASE + '/typemember/create', this.model);
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
    this.reloadPage();
    this.closeModal();
  }

  getTypeMemberByLang(lang) {
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
