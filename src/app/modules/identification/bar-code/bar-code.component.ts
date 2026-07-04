import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { BarCodeModalComponent } from '../bar-code-modal/bar-code-modal.component';
import { BarCode } from 'src/app/main/models/BarCode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';
import { BarcodeViewComponent } from '../barcode-view/barcode-view.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-bar-code',
    templateUrl: './bar-code.component.html',
    styleUrls: ['./bar-code.component.css'],
    standalone: false
})
export class BarCodeComponent extends URLLoader implements OnInit, AfterViewInit {

 

  columns = [
    //{ name: 'Color', prop: 'color', visible: true },
   // { name: 'Display Value', prop: 'displayValue', visible: true },
    //{ name: 'Font', prop: 'font', visible: true },
    { name: 'Height', prop: 'height', visible: true },
   // { name: 'ISBN', prop: 'isbn', visible: true },
    { name: 'Margin', prop: 'margin', visible: true },
    { name: 'Rotation', prop: 'rotation', visible: true },
    { name: 'Type', prop: 'type', visible: true },
    { name: 'Width', prop: 'width', visible: true },
    //{ name: 'Actions', prop: 'actions', visible: true }
  ];

  loading = false;

  barcodes$: BehaviorSubject<BarCode[]> = new BehaviorSubject<BarCode[]>([]);
  markdownContent: string;
  barcodes: BarCode[] = [];
  selected: BarCode[] = [];
  temp: BarCode[] = [];
  loadingIndicator = true;
  reorderable = true;

  constructor(private toastr: ToastrService,private barcodeService: HTTPService, private modalService: NgbModal,private http:HttpClient,private httpService:HTTPService) {
    super();
    this.temp = [...this.barcodes];
  }

  ngOnInit(): void {
    //setTimeout(() => { this.loadingIndicator = false; }, 1000);
    this.loadBarcodes();
    this.fetchMarkdownFile()
  }

  ngAfterViewInit(): void {
    // Any additional initialization after view rendering
  }

  loadBarcodes(): void {
    this.loadingIndicator = true;
    this.barcodeService.getAllBarCodes().pipe(
      finalize(() => this.loadingIndicator = false)
    ).subscribe(data => {
      this.barcodes = data;
      this.temp = [...data]; // Backup data for filtering
    });
  }

  toggleColumn(columnName: string): void {
    const column = this.columns.find(col => col.prop === columnName || col.name === columnName);
    if (column) {
      column.visible = !column.visible;
    }
  }

  updateFilter(event): void {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(b => b.isbn.toLowerCase().includes(val));
    this.barcodes = temp;
  }

  onSelect({ selected }): void {
    this.selected = [...selected];
  }

  onActivate(event): void {
  }

  editRow(row: BarCode): void {
    this.openEditDialog(row);
  }

  deleteRow(row: BarCode): void {
    this.barcodes = this.barcodes.filter(r => r !== row);
    this.barcodes$.next(this.barcodes);
    this.deleteBarcode(row.id);
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(BarCodeModalComponent);
    modalRef.componentInstance.barCode = {} as BarCode;

    modalRef.result.then(result => {
      if (result) {
        this.barcodeService.createBarCode(result).subscribe(() => {
          this.toastr.success('Item removed successfully!', 'Success');
          this.loadBarcodes();
        });
      }
    }).catch(() => {});
  }

  openEditDialog(barcode: BarCode): void {
    const modalRef = this.modalService.open(BarCodeModalComponent);
    modalRef.componentInstance.barcode = { ...barcode };

    modalRef.result.then(result => {
      if (result) {
        this.barcodeService.updateBarCode(result.id, result).subscribe(() => {
          this.loadBarcodes();
        });
      }
    }).catch(() => {});
  }

  deleteBarcode(id: number): void {
    this.barcodeService.deleteBarCode(id).subscribe(() => {
      this.loadBarcodes();
    });
  }

  refreshData(): void {
    this.loadBarcodes();
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/barcode.html', { responseType: 'text' })
      .subscribe(data => {
        this.markdownContent = data;
      });
  }

  printBarCode(qrCode) {
    // Construct the URL for the image
    let imgSrc = CONFIG.URL_BASE + '/barcode/get/' + qrCode?.isbn + '.png';
    
    // Open a new window
    let printWindow = window.open('', '_blank');
    
    // Write the HTML content to the new window
    printWindow.document.write(`
        <html>
            <head>
                <title>Print QR Code</title>
                <style>
                    body {
                        text-align: center;
                        margin: 0;
                        padding: 0;
                    }
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                </style>
            </head>
            <body>
                <img src="${imgSrc}" alt="QR Code" />
            </body>
        </html>
    `);

    // Ensure the new window is fully loaded before printing
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger the print dialog
    printWindow.onload = function() {
        printWindow.print();
        printWindow.onafterprint = function() {
            printWindow.close(); // Close the window after printing
        };
    };
    this.toastr.success('Item is printed!', 'Success');
}

 downloadBarCode(qrCode) {
  // Construct the URL for the image
  let imgSrc = CONFIG.URL_BASE + '/barcode/get/' + qrCode?.isbn + '.png';
    
  // Open a new window (or tab)
  let downloadWindow = window.open(imgSrc, '_blank');
  
  // Check if the window opened successfully
  if (downloadWindow) {
      // Instruct the new page to download the image
      downloadWindow.onload = function() {
          let a = document.createElement('a');
          a.href = imgSrc;
          a.download = qrCode?.isbn + '.png';
          downloadWindow.document.body.appendChild(a);
          a.click();
          downloadWindow.document.body.removeChild(a);
          downloadWindow.close();  // Close the window after downloading
      };
  } else {
  }
  this.toastr.success('Item is downloded !', 'Success');
}

regenerateBarCode(qrCode){
  this.httpService.getAll(CONFIG.URL_BASE + '/barcode/saveBarCode/' + qrCode?.isbn ).subscribe((data)=>{
    this.toastr.success('Item is regenerated!', 'Success');
  })
}

openViewDialog(qrCode: BarCode): void {

  const modalRef = this.modalService.open(BarcodeViewComponent);
  modalRef.componentInstance.barCode = { ...qrCode };
  modalRef.result.then(result => {})
}
}