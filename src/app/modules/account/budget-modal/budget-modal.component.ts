import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from 'src/app/main/models/Budget';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
    selector: 'app-budget-modal',
    templateUrl: './budget-modal.component.html',
    styleUrls: ['./budget-modal.component.css'],
    standalone: false
})
export class BudgetModalComponent implements OnInit {

  @Input() budget: Budget;

  constructor(
    public activeModal: NgbActiveModal,
    private budgetService: HTTPService
  ) {}

  ngOnInit(): void {
    if (!this.budget) {
      this.budget = {} as Budget;
    }
  }

  onSaveClick(): void {
   /*  if (this.budget.id) {
      this.budgetService.updateBudget(this.budget.id, this.budget).subscribe(() => {
        this.activeModal.close(this.budget);
      });
    } else {
      
    } */
    this.budgetService.createBudget(this.budget).subscribe((newBudget) => {
      this.activeModal.close(newBudget);
    });
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

}
