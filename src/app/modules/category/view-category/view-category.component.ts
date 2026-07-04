import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Category from 'src/app/main/models/Category';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CategoryComponent } from '../category/category.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/main/services/data.service';
import CONFIG from 'src/app/main/urls/urls';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-view-category',
    templateUrl: './view-category.component.html',
    styleUrls: ['./view-category.component.css'],
    standalone: false
})
export class ViewCategoryComponent implements OnInit {

  @ViewChild(CategoryComponent, { static: false }) categoryComponent!: CategoryComponent;

  @Input() category: any; // Accept category data passed from the parent
  constructor(private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router,
    private dataService: DataService,
    private httpService:HTTPService,
    private toastr: ToastrService ) {}

  ngOnInit(): void {
  }

  publish(id){
    this.httpService
      .getAll(CONFIG.URL_BASE +'/category/'+id+ '/publish')
      //.pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          
          this.toastr.success("Category published status updated successfully!")
        },
        (err: HttpErrorResponse) => {
          //super.show('Error', err.message, 'warning');
        }
      );
  }


  deleteRow(row): void {
    this.delete(row.id)
  }

  // Trigger edit event
  editCategory(value): void {
    
  }

  editRow(row): void {
    this.openEditDialog(row)
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

  openEditDialog(category: Category): void {
    const modalRef = this.modalService.open(EditCategoryComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.category = { ...category };
    this.closeModal();
    modalRef.result.then(() => this.dataService.triggerRefresh()).catch(() => {});
  }

  reloadPage(): void {
    this.router.navigateByUrl('/category', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]); // Re-navigate to the current route
    });
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/category/delete/' + id);
      /* super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      ); */
      this.closeModal()
      this.dataService.triggerRefresh();
    }
  }
 

}
