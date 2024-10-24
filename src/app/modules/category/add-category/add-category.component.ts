import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
})
export class AddCategoryComponent extends URLLoader implements OnInit {
  categoryForm: FormGroup;
  msg: CategoryMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  categoryI18n;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  suggestions: Object;

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
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/category/create',
        this.categoryForm.value
      ).then(()=>{
        this.categoryForm.reset();
        //this.closeModal();
       //this.goBack();
        this.toastr.success(this.msg.addConfirmation[CONFIG.getInstance().getLang()])
        this.activeModal.dismiss();
      });
     
      /* super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      ); */
    }
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
        this.toastr.success(this.msg.addConfirmation[CONFIG.getInstance().getLang()])
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
    const modalRef = this.modalService.open(AddCategoryComponent);
    //modalRef.componentInstance.category = { ...category }; // Ensure category is passed properly
  
    //console.log(category); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
      
    }).catch(error => console.log(error));
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
