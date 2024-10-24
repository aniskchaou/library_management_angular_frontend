import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import CategoryTestService from 'src/app/main/mocks/CategoryTestService';
import Category from 'src/app/main/models/Category';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
declare var $: any; // If using Bootstrap/jQuery

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent extends URLLoader implements OnInit {
  @Input() category: any; // Mark category as Input
  categoryI18n;
  showSuggestions;

  constructor(
    private categoryTestService: CategoryTestService,
    private httpService: HTTPService,
    private message: CategoryMessage,
    private router: Router,
    private activeModal: NgbActiveModal // Use NgbActiveModal for modal operations
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('Category:', this.category); // Now category should be available here
    this.getCategoryByLang(CONFIG.getInstance().getLang());
  }

  // Method to close the modal
  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

  saveCategory() {
    this.httpService.create(CONFIG.URL_BASE + '/category/create', this.category).then(()=>{
      super.show(
        'Confirmation',
        this.message.confirmationMessages.edit,
        'success'
      );
      this.activeModal.close(this.category)
    }
     
    );
  
    
  }

  getCategoryByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/category/' + lang)
      .subscribe(
        (data) => {
          this.categoryI18n = data;
          console.log(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  onCancelClick(): void {
    this.closeModal(); // Call close modal
  }

  toggleSuggestions(): void {
    this.showSuggestions = !this.showSuggestions;
  }

  /**
   * Handle the click event on a suggestion button.
   * @param suggestion The selected category suggestion.
   */
  onSuggestionClick(suggestion: any): void {
    this.category.categoryName = suggestion.categoryName;
    this.showSuggestions = false;
  }
}