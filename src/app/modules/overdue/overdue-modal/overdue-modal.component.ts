import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import CatalogItem from 'src/app/main/models/Book';
import { Overdue } from 'src/app/main/models/Overdue';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-overdue-modal',
  templateUrl: './overdue-modal.component.html',
  styleUrls: ['./overdue-modal.component.css']
})
export class OverdueModalComponent implements OnInit {

  @Input() overdue: Overdue;
  catalogItems: CatalogItem[] = []; // List of catalog items

  constructor(
    public activeModal: NgbActiveModal,
    private overdueService: HTTPService,
    private catalogItemService: HTTPService
  ) {}

  ngOnInit(): void {
    this.loadCatalogItems();
  }

  loadCatalogItems(): void {
    // this.catalogItemService.getAllCatalogItems().subscribe((data: CatalogItem[]) => {
    //   this.catalogItems = data;
    // });
  }

  saveOverdue(): void {
    if (this.overdue.id) {
      this.overdueService.updateOverdue(this.overdue.id, this.overdue).subscribe(() => {
        this.activeModal.close(this.overdue);
      });
    } else {
      this.overdueService.createOverdue(this.overdue).subscribe(() => {
        this.activeModal.close(this.overdue);
      });
    }
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

}
