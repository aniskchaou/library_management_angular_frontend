import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import EBook from 'src/app/main/models/EBook';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-ebook',
  templateUrl: './edit-ebook.component.html',
  styleUrls: ['./edit-ebook.component.css'],
})
export class EditEbookComponent extends URLLoader implements OnInit {
  model;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private httpService: HTTPService,
    private message: CategoryMessage
  ) {
    super();
    this.model = this.create();
  }

  create() {
    return new EBook(0, '', '', '', '', '');
  }

  ngOnInit(): void {
    this.httpService.ID.subscribe((idd) => {
      this.model = this.httpService.get(idd);
      if (this.model == undefined) {
        this.model = this.model = this.create();
      }
    });
  }

  edit() {
    this.httpService.update(CONFIG.URL_BASE + '/ebook/edit', this.model);
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
  }
}
