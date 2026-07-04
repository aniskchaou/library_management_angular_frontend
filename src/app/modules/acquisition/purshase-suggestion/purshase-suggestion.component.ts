import { Component, OnInit } from '@angular/core';
import { PurchaseSuggestion } from 'src/app/main/models/PurshaseSuggestion';
import { PurshaseSuggestionModalComponent } from '../purshase-suggestion-modal/purshase-suggestion-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-purshase-suggestion',
    templateUrl: './purshase-suggestion.component.html',
    styleUrls: ['./purshase-suggestion.component.css'],
    standalone: false
})
export class PurshaseSuggestionComponent implements OnInit {

 

  
  barChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  pieChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  lineChartData = [
    { 
      "name": "Borrow Rate",
      "series": [
        { "name": "Fiction", "value": 10 },
        { "name": "Non-fiction", "value": 15 },
        { "name": "Science", "value": 8 },
        { "name": "History", "value": 6 },
        { "name": "Biography", "value": 9 },
        { "name": "Fantasy", "value": 11 }
      ]
    }
  ];

  doughnutChartData = [
    { "name": "Fiction", "value": 5 },
    { "name": "Non-fiction", "value": 7 },
    { "name": "Science", "value": 4 },
    { "name": "History", "value": 3 },
    { "name": "Biography", "value": 4 },
    { "name": "Fantasy", "value": 6 }
  ];
  markdownContent: string
  loadingIndicator=false
  purchaseSuggestions: PurchaseSuggestion[] = [];
  loading: boolean;

  constructor(
    private purchaseSuggestionService: HTTPService,
    private modalService: NgbModal,
    private httpService:HTTPService,
    private toastr: ToastrService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.loadPurchaseSuggestions();
    this.fetchMarkdownFile()
  }

  loadPurchaseSuggestions(): void {
    this.loadingIndicator=true
    this.purchaseSuggestionService.getAllPurchaseSuggestions().subscribe(data => {
      this.purchaseSuggestions = data;
      this.loadingIndicator=false
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(PurshaseSuggestionModalComponent);
    modalRef.componentInstance.purchaseSuggestion = {} as PurchaseSuggestion;

    modalRef.result.then(result => {

          this.loadPurchaseSuggestions();
 
      
    }).catch(() => {});
  }

  openEditDialog(purchaseSuggestion: PurchaseSuggestion): void {
    const modalRef = this.modalService.open(PurshaseSuggestionModalComponent);
    modalRef.componentInstance.purchaseSuggestion = { ...purchaseSuggestion };

    modalRef.result.then(result => {
      if (result) {
        this.purchaseSuggestionService.updatePurchaseSuggestion(result.id, result).subscribe(() => {
          this.loadPurchaseSuggestions();
        });
      }
    }).catch(() => {});
  }

  deletePurchaseSuggestion(id: number): void {
    this.purchaseSuggestionService.deletePurchaseSuggestion(id).subscribe(() => {
      this.loadPurchaseSuggestions();
    });
  }

  approve(row){
    this.httpService
    .getAll(CONFIG.URL_BASE + '/purchase-suggestion/'+row.id+'/status/approved')
    .pipe(finalize(() => (this.loading = false)))
    .subscribe(
      (data) => {
        this.toastr.success('Status updated to approved')
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'warning');
      }
    );
  }

  reject(row){
    this.httpService
    .getAll(CONFIG.URL_BASE + '/purchase-suggestion/'+row.id+'/status/rejected')
    .pipe(finalize(() => (this.loading = false)))
    .subscribe(
      (data: any[]) => {
        this.toastr.success('Status updated to rejected')
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'warning');
      }
    );
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/purshase-suggestion.html', { responseType: 'text' })
      .subscribe(data => {
        this.markdownContent = data;
      });
  }
}
