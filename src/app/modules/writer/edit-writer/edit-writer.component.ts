import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-writer',
  templateUrl: './edit-writer.component.html',
  styleUrls: ['./edit-writer.component.css'],
})
export class EditWriterComponent extends URLLoader implements OnInit {
  model: Writer;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  writerI18n;

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
    return new Writer(0, '', '');
  }

  ngOnInit(): void {
    this.getWriterByLang(CONFIG.LANG);
  }

  ngOnChanges(changes: any) {
    console.log('jkv');
    this.httpService
      .get(CONFIG.URL_BASE + '/writer/' + this.id)
      .subscribe((data: Writer) => {
        this.model = data;
        console.log(this.model);
      });
  }

  edit() {
    this.httpService.create(CONFIG.URL_BASE + '/writer/create', this.model);
    this.closeModal();
    this.goBack();
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/writer']);
      });
  }

  getWriterByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/writer/' + lang).subscribe(
      (data) => {
        this.writerI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
