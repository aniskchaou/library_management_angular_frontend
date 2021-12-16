import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import Publisher from 'src/app/main/models/Publisher';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css'],
})
export class EditPublisherComponent extends URLLoader implements OnInit {
  model: Publisher;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  publisherI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private httpService: HTTPService,
    private message: CategoryMessage,
    private router: Router
  ) {
    super();
    this.model = this.create();
  }

  create() {
    return new Publisher(0, '');
  }

  ngOnInit(): void {
    this.getPublisher();
    this.getPublisherByLang(CONFIG.getInstance().getLang());
  }

  ngOnChanges(changes: any) {
    this.getPublisher();
  }

  getPublisher() {
    if (this.id != undefined) {
      this.httpService
        .get(CONFIG.URL_BASE + '/publisher/' + this.id)
        .subscribe((data: Publisher) => {
          this.model = data;
          console.log(this.model);
        });
    }
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/publisher']);
      });
  }

  edit() {
    this.httpService.create(CONFIG.URL_BASE + '/publisher/create', this.model);
    this.closeModal();
    this.goBack();
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
  }

  getPublisherByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/publisher/' + lang)
      .subscribe(
        (data) => {
          this.publisherI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
