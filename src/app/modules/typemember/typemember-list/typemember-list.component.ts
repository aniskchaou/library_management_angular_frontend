import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { ViewTypeMemberComponent } from '../view-type-member/view-type-member.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-typemember-list',
    templateUrl: './typemember-list.component.html',
    styleUrls: ['./typemember-list.component.css'],
    standalone: false
})
export class TypememberListComponent extends URLLoader implements OnInit,AfterViewInit {
  @Input() typeMembers;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Input() typeMemberI18n;

  columns = [
    { name: 'ID', prop: 'id', visible: true },
    { name: 'Member Type Name', prop: 'name', visible: true },
    { prop: 'categoryCode', name: 'Category Code' },
    { prop: 'description', name: 'Description' },
    { prop: 'upperAgeLimit', name: 'Upper Age Limit' },
    { prop: 'enrollmentFee', name: 'Enrollment Fee' },
    { prop: 'enrollmentPeriod', name: 'Enrollment Period' },
    { prop: 'holdFee', name: 'Hold Fee' },
    { prop: 'categoryType', name: 'Category Type' },
    { prop: 'minPasswordLength', name: 'Min Password Length' },
    { prop: 'requireStrongPassword', name: 'Require Strong Password' },
    { prop: 'blockExpiredPatrons', name: 'Block Expired Patrons' },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  loadingIndicator = true;
  reorderable = true;
  

  constructor(private modalService:NgbModal) {
    super();
  }
  ngAfterViewInit(): void {
    super.enableDataTable()
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editCategory(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  editCategory(value: string) {
    this.editEvent.emit(value);
  }

  openViewDialog(member): void {
    const modalRef = this.modalService.open(ViewTypeMemberComponent, {
      size: 'xl', // Set the modal size to extra-large
      centered: true, // Optional: center the modal vertically
    }); // Open the CategoryViewComponent in modal
    modalRef.componentInstance.selectedMember = { ...member }; // Pass category data



    modalRef.result.then(result => {

    }).catch(() => {}); // Handle any errors
  }
}
