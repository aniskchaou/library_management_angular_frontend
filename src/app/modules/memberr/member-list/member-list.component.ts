import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Member from 'src/app/main/models/Member';
import { ViewMemberComponent } from '../view-member/view-member.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { DataService } from 'src/app/main/services/data.service';
import { UploadDocumentMemberComponent } from '../upload-document-member/upload-document-member.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent extends URLLoader implements OnInit,AfterViewInit {
  @Input() members;
  @Output() editEvent = new EventEmitter<string>();
  @Output() viewEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  @Input() memberI18n;
  newArrivals: Member[] = [];
  unverifiedAccounts: Member[] = [];
  blockedMembers: Member[] = [];
  expiredAccounts: Member[] = [];
  constructor(private dataService:DataService,private modalService:NgbModal,private httpService:HTTPService,private toastr: ToastrService) {
    super();
    this.temp=this.members
  }
  ngAfterViewInit(): void {
    super.enableDataTable()
  }
  ngOnInit(): void {
    this.dataService.refreshData$.subscribe(() => {
      this.getUserTypeData();
    this.getGenderData();
    this.getAgeData();
    this.getCityData();
    this.loadNewArrivals();
    this.loadUnverifiedAccounts();
    this.loadBlockedMembers();
    this.loadExpiredAccounts();
    });

    this.getUserTypeData();
    this.getGenderData();
    this.getAgeData();
    this.getCityData();
    this.loadNewArrivals();
    this.loadUnverifiedAccounts();
    this.loadBlockedMembers();
    this.loadExpiredAccounts();
  }

  loadNewArrivals(): void {
    this.httpService.getNewArrivals().subscribe(
      data => this.newArrivals = data,
      error => console.error('Error fetching new arrivals:', error)
    );
  }

  loadUnverifiedAccounts(): void {
    this.httpService.getUnverifiedAccounts().subscribe(
      data => this.unverifiedAccounts = data,
      error => console.error('Error fetching unverified accounts:', error)
    );
  }

  loadBlockedMembers(): void {
    this.httpService.getBlockedMembers().subscribe(
      data => this.blockedMembers = data,
      error => console.error('Error fetching blocked members:', error)
    );
  }

  loadExpiredAccounts(): void {
    this.httpService.getExpiredAccounts().subscribe(
      data => this.expiredAccounts = data,
      error => console.error('Error fetching expired accounts:', error)
    );
  }

  edit(id) {
    this.editMember(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  view(value: string) {
    this.viewEvent.emit(value);
  }

  editMember(value: string) {
    this.editEvent.emit(value);
  }


  columns = [
    { name: 'Surname', prop: 'surname', visible: true },
    { name: 'First Name', prop: 'firstname', visible: true },
    { name: 'Email', prop: 'email', visible: true },
    { name: 'Mobile', prop: 'mobile', visible: true },
    { name: 'Address', prop: 'address', visible: true },
    { name: 'Date of Birth', prop: 'dob', visible: true },
    { name: 'Gender', prop: 'gender', visible: true },
    { name: 'Status', prop: 'status', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];
  
  
  // State Variables
  loadingIndicator = true;
  reorderable = true;
 // members: Member[] = [];
  temp: Member[] ; // Backup for filtering
  selected: Member[] = [];
  //memberI18n: any; // Define the appropriate type based on your i18n structure

  
/* 
  ngOnInit(): void {
    this.loadMembers();
    this.getMemberByLang(CONFIG.getInstance().getLang());
  } */

  // Fetch Internationalization Data
/*   getMemberByLang(lang: string): void {
    this.memberService.getI18n(lang).subscribe(
      (data) => {
        this.memberI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  } */

  // Load Members Data
/*   loadMembers(): void {
    this.loadingIndicator = true;
    this.memberService.getAllMembers().subscribe(
      (data: Member[]) => {
        this.members = data;
        this.temp = [...data]; // Backup for filtering
        this.loadingIndicator = false;
      },
      (err: HttpErrorResponse) => {
        this.loadingIndicator = false;
        super.show('Error', err.message, 'error');
      }
    );
  } */

  // Refresh Data
  refreshData(): void {
    //this.loadMembers();
  }

  // Update Filter based on Search Input
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();

    // Filter based on memberName, email, or department
    const temp = this.temp.filter(member =>
      member.firstname.toLowerCase().includes(val) ||
      member.email.toLowerCase().includes(val));

    // Update the rows
    this.members = temp;
  }

  // Handle Row Selection
  onSelect({ selected }: any): void {
    this.selected = [...selected];
    console.log('Selected Members:', this.selected);
  }

  // Handle Row Activation (e.g., click)
  onActivate(event: any): void {
    console.log('Activate Event:', event);
  }

  openViewDialog(member: Member): void {
    const modalRef = this.modalService.open(ViewMemberComponent, {
      size: 'xl', // Set the modal size to extra-large
      centered: true, // Optional: center the modal vertically
    }); // Open the CategoryViewComponent in modal
    modalRef.componentInstance.member = { ...member }; // Pass category data

    console.log(member); // Ensure category is passed properly and logged

    modalRef.result.then(result => {
      console.log(result); // Handle any result (if needed)
    }).catch(error => console.log(error)); // Handle any errors
  }



   // Define chart view sizes (optional)
   viewSize: any[] = [400, 300];

   // Toggle settings for ngx-charts options
   showLegend: boolean = false;
   showLabels: boolean = true;
   isDoughnut: boolean = false;
   gradient: boolean = true;
 
   // Chart Data
   membersByUserTypeData: any[] = [];
   genderDistributionData: any[] = [];
   ageDistributionData: any[] = [];
   membersByCityData: any[] = [];
 
 
 
   // Method to set Number of Members by User Type data
   setMembersByUserTypeData() {
     this.membersByUserTypeData = [
       { name: 'Regular Member', value: 120 },
       { name: 'Admin', value: 30 },
       { name: 'Head of Department', value: 10 },
       { name: 'Other', value: 15 }
     ];
   }
 
   // Method to set Gender Distribution of Members data
   setGenderDistributionData() {
     this.genderDistributionData = [
       { name: 'Male', value: 90 },
       { name: 'Female', value: 70 },
       { name: 'Other', value: 5 }
     ];
   }
 
   // Method to set Age Distribution of Members data
   setAgeDistributionData() {
     this.ageDistributionData = [
       { name: '18-25', value: 45 },
       { name: '26-35', value: 60 },
       { name: '36-45', value: 30 },
       { name: '46-60', value: 20 },
       { name: '60+', value: 10 }
     ];
   }
 
   // Method to set Number of Members by City data
   setMembersByCityData() {
     this.membersByCityData = [
       { name: 'New York', value: 40 },
       { name: 'Los Angeles', value: 30 },
       { name: 'Chicago', value: 25 },
       { name: 'Houston', value: 20 },
       { name: 'Phoenix', value: 15 }
     ];
   }


    // Get the number of members by user type and create a chart
  getUserTypeData(): void {
    this.httpService.getMembersByUserType().subscribe(
      (data) => {
        this.membersByUserTypeData = data
      },
      (error) => {
        console.error('Error fetching user type data:', error);
      }
    );
  }

  // Get the gender distribution of members and create a chart
  getGenderData(): void {
    this.httpService.getMembersByGender().subscribe(
      (data) => {
        this.genderDistributionData =data
      },
      (error) => {
        console.error('Error fetching gender data:', error);
      }
    );
  }

  // Get the age distribution of members and create a chart
  getAgeData(): void {
    this.httpService.getMembersByAge().subscribe(
      (data) => {
        this.ageDistributionData = data
      },
      (error) => {
        console.error('Error fetching age data:', error);
      }
    );
  }

  upload(ùember){}

  // Get the number of members by city and create a chart
  getCityData(): void {
    this.httpService.getMembersByCity().subscribe(
      (data) => {
        this.membersByCityData = data
      },
      (error) => {
        console.error('Error fetching city data:', error);
      }
    );
  }

 
  active(member){
    this.httpService.getAll(`${CONFIG.URL_BASE}/member/${member.id}/reactivate`).subscribe(
      (data) => {
        this.toastr.success("Member has been reactivated successfully.")
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching member:', err.message);
      }
    );
  }

  verify(member){
    this.httpService.getAll(`${CONFIG.URL_BASE}/member/${member.id}/verify`).subscribe(
      (data) => {
        this.toastr.success("Member has been verified successfully.")
        
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching member:', err.message);
      }
    );
  }

  block(member){
    this.httpService.getAll(`${CONFIG.URL_BASE}/member/${member.id}/block`).subscribe(
      (data) => {
        this.toastr.success("Member has been blocked successfully.")
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching member:', err.message);
      }
    );
  }

  openEditDialog(member: any): void {
    const modalRef = this.modalService.open(EditMemberComponent);
    modalRef.componentInstance.member = { ...member }; // Pass the member data
   
    modalRef.result.then(result => {
      console.log(result);
      this.dataService.triggerRefresh(); // Trigger refresh in other components
    }).catch(error => console.log(error));
  }

  deleteRow(member) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/member/delete/' + member.id);
      /* super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage(); */
    }
  }

  openUploadialog(row): void {
    const modalRef = this.modalService.open(UploadDocumentMemberComponent);
    modalRef.componentInstance.member = row;

    modalRef.result.then(result => {
      if (result) {
       /*  this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }

 /*  openEditDialog(member): void {
    const modalRef = this.modalService.open(EditMemberComponent);
    modalRef.componentInstance.member = member;

    modalRef.result.then(result => {
      if (result) {
        this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        });
      }
    }).catch(error => console.log(error));
  } */
}
