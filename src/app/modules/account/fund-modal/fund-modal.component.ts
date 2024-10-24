import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from 'src/app/main/models/Budget';
import { Fund } from 'src/app/main/models/Fund';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-fund-modal',
  templateUrl: './fund-modal.component.html',
  styleUrls: ['./fund-modal.component.css']
})
export class FundModalComponent implements OnInit {

  @Input() fund: Fund;
  budgets: Budget[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fundService: HTTPService,
    private budgetService: HTTPService
  ) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getAllBudget().subscribe(data => {
      this.budgets = data;
    });
  }

  onSaveClick(): void {
    
    this.fund.budget = this.budgets.find(item => item.id === this.fund.budget.id);
    console.log(this.fund)
      this.fundService.createFund(this.fund).subscribe((newFund) => {
        this.activeModal.close(newFund);
      });
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }
}
