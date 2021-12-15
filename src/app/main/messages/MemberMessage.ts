import { Injectable } from '@angular/core';
import CONFIG from '../urls/urls';

@Injectable({
  providedIn: 'root',
})
export default class MemberMessage {
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
    name: 'Name is required.',
    user_type: 'User Type is required.',
    type_id: 'Type  required.',
    email: 'Email is required.',
    mobile: 'Mobile is required.',
    password: 'Password is required.',
    address: 'Address is required.',
    status: 'Status is required.',
  };

  constructor() {}
}
