import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private fundService: HTTPService,
    private budgetService: HTTPService
  ) {}

  ngOnInit(): void {
    this.loadBudgets();
     console.log(this.fund)
    /* if (!this.fund.budget) {
      this.fund.budget = {} as Budget;
    } */
  }

  

  loadBudgets(): void {
     this.budgetService.getAllBudget().subscribe(data => {
      console.log(data)
        
      this.budgets = data;
      //this.fund.budget = this.budgets.find((b) => b.id === this.fund.budget.id) || null;
    }); 
  }

  onSaveClick(): void {
    //console.log(this.fund.budget.id)
    if(this.validateFundForm()){
      this.fund.budget = this.budgets.find(item => item.id === this.fund.budget.id);
    console.log(this.fund)
      this.fundService.createFund(this.fund).subscribe((newFund) => {
        this.toastr.success('Item added successfully!', 'Success');
        this.activeModal.close(newFund);
      });
    }
    
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  validateFundForm(): boolean {
    if (!this.fund.fundCode || this.fund.fundCode.trim() === '') {
      this.toastr.error('Fund Code is required.');
      return false;
    }
  
    if (!this.fund.fundName || this.fund.fundName.trim() === '') {
      this.toastr.error('Fund Name is required.');
      return false;
    }
  
    if (this.fund.amount === null || this.fund.amount === undefined || this.fund.amount <= 0) {
      this.toastr.error('Amount must be a positive number.');
      return false;
    }
  
    if (
      this.fund.warningAtPercentage === null ||
      this.fund.warningAtPercentage === undefined ||
      this.fund.warningAtPercentage < 0 ||
      this.fund.warningAtPercentage > 100
    ) {
      this.toastr.error('Warning at Percentage must be between 0 and 100.');
      return false;
    }
  
    if (
      this.fund.warningAtAmount === null ||
      this.fund.warningAtAmount === undefined ||
      this.fund.warningAtAmount < 0
    ) {
      this.toastr.error('Warning at Amount must be a non-negative number.');
      return false;
    }
  
    if (!this.fund.owner || this.fund.owner.trim() === '') {
      this.toastr.error('Owner is required.');
      return false;
    }
  
    if (!this.fund.budget) {
      this.toastr.error('Please select a budget.');
      return false;
    }
  
    return true;
  }
  
}
