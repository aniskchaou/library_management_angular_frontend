import { Injectable } from '@angular/core';
import CONFIG from '../urls/urls';

@Injectable({
  providedIn: 'root',
})
export default class BookMessage {
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
    isbn: 'ISBN  is required.',
    title: 'Title is required.',
    writer: 'Author is required .',
    edition: 'Edition is required.',
    edition_year: 'Edition year is required.',
    photo: ' Photo  is required.',
    physical_form: 'Physical form is required.',
    publisher: ' Publisher  is required.',
    publishing_year: 'Publication year  is required.',
    publication_place: 'Publication place is required.',
    number_of_pages: ' Number of pages is required.',
    notes: ' Note  is required.',
    status: ' Status file  is required.',
  };

  constructor() {}
}
