import { Component, OnInit } from '@angular/core';
import { Fund } from 'src/app/main/models/Fund';
import { FundModalComponent } from '../fund-modal/fund-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {

  columns = [
    { name: 'Fund Code', prop: 'fundCode', visible: true },
    { name: 'Fund Name', prop: 'fundName', visible: true },
    { name: 'Amount', prop: 'amount', visible: true },
    { name: 'Warning at Percentage', prop: 'warningAtPercentage', visible: true },
    { name: 'Warning at Amount', prop: 'warningAtAmount', visible: true },
    { name: 'Owner', prop: 'owner', visible: true },
    { name: 'Notes', prop: 'notes', visible: true },
    //{ name: 'Budget', prop: 'budget.name', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  loadingIndicator = true;
  reorderable = true;
  funds$: BehaviorSubject<Fund[]> = new BehaviorSubject<Fund[]>([]);
  funds: Fund[] = [];
  temp: Fund[] = [];
  selected = [];

  constructor(
    private fundService: HTTPService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //setTimeout(() => { this.loadingIndicator = false; }, 1000);
    this.loadFunds();
  }

  loadFunds(): void {
    this.loadingIndicator = true;
    this.fundService.getAllFunds().subscribe(data => {
      this.funds = data;
      this.temp = [...data]; // Backup data for filtering
      this.loadingIndicator = false;
    });
  }

  updateFilter(event): void {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(d => d.fundName.toLowerCase().includes(val));
    this.funds = temp;
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(FundModalComponent);
    modalRef.componentInstance.fund = {} as Fund;

    modalRef.result.then(result => {
      if (result) {
        this.fundService.createFund(result).subscribe(() => {
          this.loadFunds();
        });
      }
    }).catch(error => console.log(error));
  }

  openEditDialog(fund: Fund): void {
    const modalRef = this.modalService.open(FundModalComponent);
    modalRef.componentInstance.fund = { ...fund };

    modalRef.result.then(result => {
      if (result) {
        this.fundService.updateFund(result.id, result).subscribe(() => {
          this.loadFunds();
        });
      }
    }).catch(error => console.log(error));
  }

  deleteFund(id: number): void {
    this.fundService.deleteFund(id).subscribe(() => {
      this.loadFunds();
    });
  }

  onSelect({ selected }): void {
    console.log('Selected row:', selected);
    this.selected = [...selected];
  }

  onActivate(event): void {
    console.log('Activate Event:', event);
  }
}
