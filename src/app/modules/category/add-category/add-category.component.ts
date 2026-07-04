import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import CategoryTestService from 'src/app/main/mocks/CategoryTestService';
import { ChatCompletionResponse } from 'src/app/main/models/ia.response';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import CategoryValidation from 'src/app/main/validations/CategoryValidation';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css'],
    standalone: false
})
export class AddCategoryComponent extends URLLoader implements OnInit {
  categoryForm: UntypedFormGroup;
  msg: CategoryMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  categoryI18n;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  suggestions: Object;
  errors:any

  constructor(
    private validation: CategoryValidation,
    private message: CategoryMessage,
    private httpService: HTTPService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    super();
    this.categoryForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/category']);
      });
  }
  get f() {
    return this.categoryForm.controls;
  }

  ngOnInit(): void {
    this.getCategoryByLang(CONFIG.getInstance().getLang());
    //this.toastr.error('This is an error message.', 'Error');
  }

  reset() {
    this.categoryForm.reset();
  }

  add() {
   // this.submitted = true;
    if (this.validateForm()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/category/create',
        this.categoryForm.value
      ).then(()=>{
        //this.categoryForm.reset();
        //this.closeModal();
       //this.goBack();
       this.toastr.success('Item added successfully!', 'Success');
        this.activeModal.dismiss();
      });
     
      /* super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      ); */
    }
  }
   

  validateForm() {
    this.errors = {};

    // Validate Category Name
    if (!this.categoryForm.value.category_name || this.categoryForm.value.category_name.length < 2) {
      this.errors.category_name = 'Category Name is required and must be at least 2 characters.';
      this.toastr.error(this.errors.category_name, 'Validation Error');
    }

    // Validate Slug
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!this.categoryForm.value.slug || !slugPattern.test(this.categoryForm.value.slug)) {
      this.errors.slug = 'Slug is required and must follow the format (e.g., fiction-category).';
      this.toastr.error(this.errors.slug, 'Validation Error');
    }

    // Validate Published
    if (this.categoryForm.value.published === null || this.categoryForm.value.published === undefined) {
      this.errors.published = 'Published status is required.';
      this.toastr.error(this.errors.published, 'Validation Error');
    }

    return Object.keys(this.errors).length === 0;
  }


  addMore() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/category/create',
        this.categoryForm.value
      ).then(()=>{
        this.categoryForm.reset();
        ///this.closeModal();
        //this.goBack();
        this.toastr.success('Item added successfully!', 'Success');
        this.activeModal.dismiss();
        this.openAddDialog()
      });
     
      /* super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      ); */
    }
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'xl', centered: true });
    modalRef.result.then(() => {}).catch(() => {});
  }

  getCategoryByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/category/' + lang)
      .subscribe(
        (data) => {
          this.categoryI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  onCancelClick(){
    this.activeModal.dismiss();
  }

  suggest(){
    this.httpService
      .getAll(CONFIG.URL_BASE + '/category/suggestions')
      .subscribe(
        (data:ChatCompletionResponse) => {
          this.suggestions = data.choices[0].message.content;;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap tooltips
    //$('[data-toggle="tooltip"]').tooltip();
  }
}
