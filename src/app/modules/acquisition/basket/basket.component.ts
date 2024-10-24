import { Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { Basket } from 'src/app/main/models/Basket';
import { BasketModalComponent } from '../basket-modal/basket-modal.component';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  // Chart data
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

  // Table columns
  columns = [
    { name: 'Basket Name', prop: 'basketName', visible: true },
    { name: 'Billing Place', prop: 'billingPlace', visible: true },
    { name: 'Delivery Place', prop: 'deliveryPlace', visible: true },
    { name: 'Vendor', prop: 'vendor.name', visible: true },
    { name: 'Internal Note', prop: 'internalNote', visible: true },
    { name: 'Vendor Note', prop: 'vendorNote', visible: true },
    { name: 'Create Items When', prop: 'createItemsWhen', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  // Component state
  baskets$: BehaviorSubject<Basket[]> = new BehaviorSubject<Basket[]>([]);
  baskets: Basket[] = [];
  temp: Basket[] = [];
  selected: Basket[] = [];
  loadingIndicator = true;
  reorderable = true;
  loading = false;
  markdownContent: any;

  constructor(
    private basketService: HTTPService,
    private modalService: NgbModal,
    private http:HttpClient
  ) {

  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/basket.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  ngOnInit(): void {
    this.loadBaskets();
    this.fetchMarkdownFile()
  }

  // Fetch baskets
  loadBaskets(): void {
    this.loadingIndicator = true;
    this.basketService.getAllBaskets().subscribe(data => {
      this.baskets = data;
      console.log(data)
      this.temp = [...data]; // Backup data for filtering
      this.loadingIndicator = false;
    });
  }

  // Refresh data
  refreshData(): void {
    this.loadBaskets();
  }

  // Search filter
  updateFilter(event): void {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(b => 
      b.basketName.toLowerCase().includes(val) || 
      b.billingPlace.toLowerCase().includes(val) || 
      b.deliveryPlace.toLowerCase().includes(val)
    );
    this.baskets = temp;
  }

  // Select row
  onSelect({ selected }): void {
    console.log('Selected row:', selected);
    this.selected = [...selected];
  }

  // Activate row
  onActivate(event): void {
    console.log('Activate Event:', event);
  }

  // Edit row
  openEditDialog(basket: Basket): void {
    const modalRef = this.modalService.open(BasketModalComponent);
    modalRef.componentInstance.basket = { ...basket };

    modalRef.result.then(result => {
      if (result) {
        this.basketService.updateBasket(result.id, result).subscribe(() => {
          this.loadBaskets();
        });
      }
    }).catch(error => console.log(error));
  }

  // Delete row
  deleteBasket(id: number): void {
    this.basketService.deleteBasket(id).subscribe(() => {
      this.loadBaskets();
    });
  }

  // Open add dialog
  openAddDialog(): void {
    const modalRef = this.modalService.open(BasketModalComponent);
    modalRef.componentInstance.basket = {} as Basket;

    modalRef.result.then(result => {

          this.loadBaskets();
  
    }).catch(error => console.log(error));
  }
}
