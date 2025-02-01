import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { VendorModalComponent } from '../vendor-modal/vendor-modal.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'] // Update with the correct path
})
export class VendorComponent implements OnInit {

  // Sample data for different charts
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

  vendors$: BehaviorSubject<Vendor[]> = new BehaviorSubject<Vendor[]>([]);
  vendors: Vendor[] = [];
  loadingIndicator = true;
  markdownContent: any;


  constructor(
    private toastr: ToastrService,
    private vendorService: HTTPService,
    private modalService: NgbModal,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.loadVendors();
    this.fetchMarkdownFile()
  }

  loadVendors(): void {
    this.loadingIndicator = true;
    this.vendorService.getAllVendors().subscribe(
      data => {
        this.vendors = data;
        this.loadingIndicator = false;
      },
      error => {
        console.error('Error loading vendors', error);
        this.loadingIndicator = false;
      }
    );
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(VendorModalComponent);
    modalRef.componentInstance.vendor = {} as Vendor;

    modalRef.result.then(result => {
      
          this.loadVendors();
      
    }).catch(error => console.log(error));
  }

  openEditDialog(vendor: Vendor): void {
    const modalRef = this.modalService.open(VendorModalComponent);
    modalRef.componentInstance.vendor = { ...vendor };

    modalRef.result.then(result => {

          this.loadVendors();

      
    }).catch(error => console.log(error));
  }

  deleteVendor(id: number): void {
    this.vendorService.deleteVendor(id).subscribe(() => {
      this.loadVendors();
      this.toastr.success('Item removed successfully!', 'Success')
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/vendor.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }
}
