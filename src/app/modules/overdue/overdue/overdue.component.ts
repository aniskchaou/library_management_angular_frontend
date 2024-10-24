import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { Overdue } from 'src/app/main/models/Overdue';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { OverdueModalComponent } from '../overdue-modal/overdue-modal.component';
import CatalogItem from 'src/app/main/models/Book';
import CONFIG from 'src/app/main/urls/urls';
import Circulation from 'src/app/main/models/Circulation';
import { ViewCirculationComponent } from '../../circulations/view-circulation/view-circulation.component';
import { RenewComponent } from '../../circulations/renew/renew.component';
import { HoldComponent } from '../../circulations/hold/hold.component';
import { CheckInComponent } from '../../circulations/check-in/check-in.component';
import { CheckOutComponent } from '../../circulations/check-out/check-out.component';

@Component({
  selector: 'app-overdue',
  templateUrl: './overdue.component.html',
  styleUrls: ['./overdue.component.css']
})
export class OverdueComponent extends URLLoader implements OnInit,AfterViewInit {
  tomorrow: any;
  today: number;
  yerterday: number;
  total: number;
  soon: number;
  yesterday: number;

 
  ngAfterViewInit(): void {
    super.enableDataTable()
  }
  overdues: Overdue[] = [];
  loadingIndicator
  reorderable

  constructor(private overdueService: HTTPService, private modalService: NgbModal,private httpService:HTTPService) {super()}

  ngOnInit(): void {

    this.loadAllCirculations();
    this.loadSoonCirculations();
    this.loadYesterdayCirculations();
    this.loadTodayCirculations();
    this.loadTomorrowCirculations(); 
    
   /*  this.overdues = [
      {
        id: 1,
        catalogItem: new CatalogItem(
          1,
          '978-0743273565',
          'The Great Gatsby',
          '',
          'F. Scott Fitzgerald',
          '1st',
          '1925',
          '3',
          'url_to_photo',
          'Hardcover',
          'Scribner',
          '',
          '8vo',
          '10.99',
          'FIC FIT',
          'Shelf A1',
          '',
          '',
          '1925',
          'New York',
          '218',
          '',
          '',
          '',
          '',
          'Fiction'
        ),
        dueDate: new Date('2023-09-15'),
        returnDate: new Date('2023-09-20'),
        fineAmount: 5.00
      },
      {
        id: 2,
        catalogItem: new CatalogItem(
          2,
          '978-0451524935',
          '1984',
          '',
          'George Orwell',
          '1st',
          '1949',
          '5',
          'url_to_photo',
          'Paperback',
          'Secker & Warburg',
          '',
          '8vo',
          '9.99',
          'FIC ORW',
          'Shelf B2',
          '',
          '',
          '1949',
          'London',
          '328',
          '',
          '',
          '',
          '',
          'Dystopian'
        ),
        dueDate: new Date('2023-09-10'),
        returnDate: null,
        fineAmount: 10.00
      },
      {
        id: 3,
        catalogItem: new CatalogItem(
          3,
          '978-0061120084',
          'To Kill a Mockingbird',
          '',
          'Harper Lee',
          '1st',
          '1960',
          '4',
          'url_to_photo',
          'Paperback',
          'J.B. Lippincott & Co.',
          '',
          '8vo',
          '14.99',
          'FIC LEE',
          'Shelf C3',
          '',
          '',
          '1960',
          'Philadelphia',
          '281',
          '',
          '',
          '',
          '',
          'Classic'
        ),
        dueDate: new Date('2023-09-18'),
        returnDate: new Date('2023-09-25'),
        fineAmount: 0.00
      },
      {
        id: 4,
        catalogItem: new CatalogItem(
          4,
          '978-0143039433',
          'Pride and Prejudice',
          '',
          'Jane Austen',
          '1st',
          '1813',
          '10',
          'url_to_photo',
          'Paperback',
          'T. Egerton',
          '',
          '8vo',
          '12.99',
          'FIC AUS',
          'Shelf D4',
          '',
          '',
          '1813',
          'London',
          '279',
          '',
          '',
          '',
          '',
          'Romance'
        ),
        dueDate: new Date('2023-09-05'),
        returnDate: null,
        fineAmount: 15.00
      }
    ]; */
  }

  loadOverdues(): void {
    this.overdueService.getAllOverdue().subscribe((data: Overdue[]) => {
      this.overdues = data;
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(OverdueModalComponent);
    modalRef.componentInstance.overdue = {} as Overdue;

    modalRef.result.then(result => {
      if (result) {
        this.overdueService.createOverdue(result).subscribe(() => {
          this.loadOverdues();
        });
      }
    }).catch(error => console.log(error));
  }

  openEditDialog(overdue: Overdue): void {
    const modalRef = this.modalService.open(OverdueModalComponent);
    modalRef.componentInstance.overdue = { ...overdue };

    modalRef.result.then(result => {
      if (result) {
        this.overdueService.updateOverdue(result.id!, result).subscribe(() => {
          this.loadOverdues();
        });
      }
    }).catch(error => console.log(error));
  }

  deleteOverdue(id: number): void {
    this.overdueService.deleteOverdue(id).subscribe(() => {
      this.loadOverdues();
    });
  }

  soonCirculations;
  yesterdayCirculations;
  todayCirculations;
  tomorrowCirculations; // New property
  circulations


  loadAllCirculations() {
    this.httpService
    .getAll(CONFIG.URL_BASE + '/circulation/overdue' ).subscribe((data:Circulation[] ) => {
      console.log(data)
      this.circulations = data;
      this.total=data.length
      //this.loadingIndicator = false;
    });
  }

  loadSoonCirculations() {
    this.httpService
    .getAll(CONFIG.URL_BASE + '/circulation/soon').subscribe((data:Circulation[] ) => {
      this.soonCirculations = data;
      this.soon=data.length
    });
  }

  loadYesterdayCirculations() {
    this.httpService
    .getAll(CONFIG.URL_BASE + '/circulation/yesterday').subscribe((data:Circulation[] ) => {
      this.yesterdayCirculations = data;
      this.yesterday=data.length
    });
  }

  loadTodayCirculations() {
    this.httpService
    .getAll(CONFIG.URL_BASE + '/circulation/today' ).subscribe((data:Circulation[] ) => {
      this.todayCirculations = data;
      this.today=data.length
    });
  }

  loadTomorrowCirculations() { // New method to load tomorrow's circulations
    this.httpService
    .getAll(CONFIG.URL_BASE + '/circulation/tomorrow').subscribe((data:Circulation[] )=> {
      this.tomorrowCirculations = data;
      this.tomorrow=data.length
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
      
    }).catch(error => console.log(error));
  }

}
