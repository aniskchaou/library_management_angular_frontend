import { Component, OnInit } from '@angular/core';
import { BudgetModalComponent } from '../budget-modal/budget-modal.component';
import { Budget } from 'src/app/main/models/Budget';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import CONFIG from 'src/app/main/urls/urls';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
 // budgets$: BehaviorSubject<Budget[]> = new BehaviorSubject<Budget[]>([]);
  loadingIndicator = true;
  reorderable = true;
  selected = [];
  temp = [];
  budgets$
  constructor(private toastr: ToastrService,private budgetService: HTTPService, private modalService: NgbModal,private httpService:HTTPService) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.loadingIndicator = true;
    this.budgetService.getAllBudget().subscribe((data:Budget[]) => {
      
      //this.temp = [...data];
      this.budgets$=data
      //this.budgets$.next(data);
      this.loadingIndicator = false;
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(BudgetModalComponent);
    modalRef.componentInstance.budget = {} as Budget;

    modalRef.result.then(result => {
      if (result) {
        this.budgetService.createBudget(result).subscribe(() => {
          this.loadBudgets();
        });
      }
    }).catch(error => console.log(error));
  }

  openEditDialog(budget: Budget): void {
    const modalRef = this.modalService.open(BudgetModalComponent);
    modalRef.componentInstance.budget = { ...budget };

    modalRef.result.then(result => {
      if (result) {
        this.budgetService.updateBudget(result.id, result).subscribe(() => {
          this.loadBudgets();
        });
      }
    }).catch(error => console.log(error));
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => {
      this.loadBudgets();
    });
  }

  onSelect({ selected }) {
    console.log('Selected row:', selected);
    this.selected = [...selected];
  }

  onActivate(event) {
    console.log('Activate Event:', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.budgets$.next(this.temp.filter(b => b.description.toLowerCase().includes(val)));
  }
  lockBudget(row){
    this.httpService
    .getAll(CONFIG.URL_BASE + '/budget/'+row.id+'/lock')

       this.loadBudgets()
       this.toastr.success("The budget has been successfully locked.")
      
  
  }
}