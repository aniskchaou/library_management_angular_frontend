import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Circulation from 'src/app/main/models/Circulation';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { ViewCirculationComponent } from '../view-circulation/view-circulation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RenewComponent } from '../renew/renew.component';
import { HoldComponent } from '../hold/hold.component';
import { CheckInComponent } from '../check-in/check-in.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { DataService } from 'src/app/main/services/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChartData } from '../../category/category/category.component';

@Component({
  selector: 'app-circulation-list',
  templateUrl: './circulation-list.component.html',
  styleUrls: ['./circulation-list.component.css'],
})
export class CirculationListComponent extends URLLoader implements OnInit, AfterViewInit {
  @Input() circulations;
  @Input() circulationI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() viewEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() contactEvent = new EventEmitter<string>();
  writer: Writer;

  temp: Circulation[] = [];
  columns = [
   // { name: 'ID', prop: 'id', visible: true },
    { name: 'Member Name', prop: 'memberName.firstname', visible: true }, // Adjust based on Member model
    { name: 'Book Name', prop: 'catalogItemName.title', visible: true }, // Adjust based on CatalogItem model
    { name: 'Writer', prop: 'catalogItemName.writer.name', visible: true }, // Adjust based on Writer model
    { name: 'Issue Date', prop: 'issueDate', visible: true },
    { name: 'Last Date', prop: 'lastDate', visible: true },
    { name: 'To Return', prop: 'toReturn', visible: true },
    { name: 'Return Date', prop: 'returnDate', visible: true },
    { name: 'Penalty', prop: 'penalty', visible: true },
    { name: 'Return Status', prop: 'returnStatus', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  selected:any[] = [];
  
  loadingIndicator = true;
  reorderable = true;
  markdownContent: string;
  renewals: Circulation[];
  onholds: Circulation[];
  checkins: Circulation[];
  checkouts: Circulation[];
  renewal: number=0;
  onHold: number=0;
  checkout: number=0;
  checkin: number=0;
  total: any=0;

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    
    // Filter based on departmentName or any other relevant property
    const temp = this.temp.filter(d => d.catalogItemName.title.toLowerCase().includes(val));
  
    // Update the rows
    this.circulations = temp;
  }

  onSelect({ selected }) {
    console.log('Selected row:', selected);
    this.selected = [...selected];
  }

  onActivate(event) {
    console.log('Activate Event:', event);
  }

  constructor(private http:HttpClient,private dataService:DataService,private httpService: HTTPService, private router: Router,private modalService: NgbModal) {
    super();
  }
  ngAfterViewInit(): void {
    super.enableDataTable()
  }

  ngOnInit(): void {
    this.loadScripts();
    console.log(this.circulations);
// Load tomorrow circulations
this.fetchMarkdownFile()
this.loadMemberTypeData();
    this.loadBorrowedItemsCategoryData();
    this.loadTotalPenalties();
    this.loadCirculationStatusData();
    this.total=this.circulations.length


   /*  this.totalPenalties=[
      {
        "name": "Books",
        "value": 50
      },
      {
        "name": "Magazines",
        "value": 20
      },
      {
        "name": "DVDs",
        "value": 15
      },
      {
        "name": "Audiobooks",
        "value": 10
      },
      {
        "name": "eBooks",
        "value": 5
      }
    ];
 */
this.httpService.getAll(CONFIG.URL_BASE + '/circulation/renew').subscribe(
  (data: Circulation[]) => {
    this.renewals = data;
    this.renewal =data.length
    
  },
  (err: HttpErrorResponse) => {
    super.show('Error', err.message, 'error');
  }
);


this.httpService.getAll(CONFIG.URL_BASE + '/circulation/onhold').subscribe(
  (data: Circulation[]) => {
    this.onholds = data;
    this.onHold =data.length
    //this.loading = false;
  },
  (err: HttpErrorResponse) => {
    super.show('Error', err.message, 'error');
  }
);


this.httpService.getAll(CONFIG.URL_BASE + '/circulation/checkin').subscribe(
  (data: Circulation[]) => {
    this.checkins = data;
    this.checkin=data.length
    //this.loading = false;
  },
  (err: HttpErrorResponse) => {
    super.show('Error', err.message, 'error');
  }
);

this.httpService.getAll(CONFIG.URL_BASE + '/circulation/checkout').subscribe(
  (data: Circulation[]) => {
    this.checkouts = data;
    this.checkout=data.length>0?data.length:0
    //this.loading = false;
  },
  (err: HttpErrorResponse) => {
    super.show('Error', err.message, 'error');
  }
);





  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/circulation.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  toObject(str) {
    return JSON.parse(str);
  }
  edit(id) {
    this.editEvent.emit(id);
  }

  view(id) {
    this.viewEvent.emit(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }
  contact(email) {
    console.log(email);
    this.contactEvent.emit(email);
  }

  setEvent(value: string) {
    this.editEvent.emit(value);
  }

  return(id) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/circulation/return/' + id)
      .subscribe((data) => {
        this.router
          .navigateByUrl('/dashboard', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/circulation']);
          });
      });
  }

  openViewDialog(circulation: Circulation): void {
    const modalRef = this.modalService.open(ViewCirculationComponent
      ,{size: 'xl',
      centered: true}
    );
    modalRef.componentInstance.circulation = { ...circulation }; // Ensure category is passed properly
  
    console.log(circulation); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
       this.ngOnInit()
      
    }).catch(error => console.log(error));
  }

  
  openCheckOut(): void {
    const modalRef = this.modalService.open(CheckOutComponent
      ,{//size: 'xl',
      centered: true}
    );
   // modalRef.componentInstance.circulation = { ...circulation }; // Ensure category is passed properly
  
    //console.log(circulation); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
       this.ngOnInit()
      
    }).catch(error => console.log(error));
  }

  openCheckIn(): void {
    const modalRef = this.modalService.open(CheckInComponent
      ,{//size: 'xl',
      centered: true}
    );
    //modalRef.componentInstance.circulation = { ...circulation }; // Ensure category is passed properly
  
    //console.log(circulation); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
       this.ngOnInit()
       
      
    }).catch(error => console.log(error));
  }

  openPutOnHold(): void {
    const modalRef = this.modalService.open(HoldComponent
      ,{//size: 'xl',
      centered: true}
    );
    //modalRef.componentInstance.circulation = { ...circulation }; // Ensure category is passed properly
  
   // console.log(circulation); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
       this.ngOnInit()
      
    }).catch(error => console.log(error));
  }

  openRenew(): void {
    const modalRef = this.modalService.open(RenewComponent
      ,{//size: 'xl',
      centered: true}
    );
    //modalRef.componentInstance.circulation = { ...circulation }; // Ensure category is passed properly
  
    //console.log(circulation); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
       this.ngOnInit()
      
    }).catch(error => console.log(error));
  }




  memberTypeData: any[] = [];
  borrowedItemsCategoryData: any[] = [];
  totalPenalties;
  circulationStatusData: any[] = [];

 
    
  

  loadMemberTypeData(): void {
    this.httpService.getCirculationsByMemberType().subscribe((data) => {
      this.memberTypeData = data;
    });
  }

  loadBorrowedItemsCategoryData(): void {
    this.httpService.getBorrowedItemsByCategory().subscribe((data) => {
      this.borrowedItemsCategoryData = data;
    });
  }

  loadTotalPenalties(): void {
    this.httpService.getTotalPenalties().subscribe((data) => {
      //this.totalPenalties = data;
      this.totalPenalties=[
        {
          "name": "Books",
          "value": 50
        },
        {
          "name": "Magazines",
          "value": 20
        },
        {
          "name": "DVDs",
          "value": 15
        },
        {
          "name": "Audiobooks",
          "value": 10
        },
        {
          "name": "eBooks",
          "value": 5
        }
      ];
    });
  }

  loadCirculationStatusData(): void {
    this.httpService.getCirculationStatusDistribution().subscribe((data) => {
      this.circulationStatusData = data;
    });
  }

  reload(){
   this.loadCirculationStatusData()
   this.loadBorrowedItemsCategoryData()
   this.loadMemberTypeData()
   this.ngOnInit()
  }



}
