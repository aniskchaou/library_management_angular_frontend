import { Injectable } from '@angular/core';
import CONFIG from '../urls/urls';

@Injectable({
  providedIn: 'root',
})
export default class RequestedBookMessage {
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
    book: 'Book  is required.',
    writer: 'Writer is required.',
    ctegory: 'Category is required.',
    member: 'Member is required .',
  };

  constructor() {}
}
