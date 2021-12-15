import { Injectable } from '@angular/core';
import CONFIG from '../urls/urls';

@Injectable({
  providedIn: 'root',
})
export default class CirculationMessage {
  addConfirmation = {
    FR: 'element a été ajouté',
    EN: 'Item has been added',
  };

  editConfirmation = {
    FR: 'element a été ajouté',
    EN: 'Item has been modified',
  };

  deleteConfirmation = {
    FR: 'element a été ajouté',
    EN: 'Item has been removed',
  };

  titleConfirmation = {
    FR: 'Confirmation',
    EN: 'Message',
  };

  confirmationMessages = {
    title: this.titleConfirmation[CONFIG.LANG],
    add: this.addConfirmation[CONFIG.LANG],
    edit: this.editConfirmation[CONFIG.LANG],
    delete: this.deleteConfirmation[CONFIG.LANG],
  };

  validationMessage = {
    memberName: 'Member Name  is required.',
    bookName: 'Book name is required.',
    writer: 'Wrirer is required.',
    issueDate: 'Issue Date is required .',
    lastDate: 'Last Date is required.',
    toReturn: 'To Return year is required.',
    returnDate: 'Return Date of books is required.',
    penalty: ' Panalty  is required.',
    returnStatus: 'Return Status form is required.',
  };

  constructor() {}
}
