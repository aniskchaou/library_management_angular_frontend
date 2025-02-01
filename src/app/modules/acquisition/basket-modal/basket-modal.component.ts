import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/main/models/Basket';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-basket-modal',
  templateUrl: './basket-modal.component.html',
  styleUrls: ['./basket-modal.component.css']
})
export class BasketModalComponent implements OnInit {

  
  @Input() basket: Basket;
  vendors: Vendor[] = [];

  constructor(
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private basketService: HTTPService,
    private vendorService: HTTPService
  ) {}

  ngOnInit(): void {
    console.log(this.basket);
    this.loadVendors();
  }

  onSaveClick(): void {
    if(this.validateBasketForm(this.basket)){
      this.basket.vendor=this.vendors.find(item=>item.id===this.basket.vendor.id)
   console.log(this.basket)
      this.basketService.createBasket(this.basket).subscribe((newBasket) => {
        this.activeModal.close(newBasket);
        this.toastr.success('Item added successfully!', 'Success');
      });
    }
   
    
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe((data: Vendor[]) => {
      this.vendors = data;
    });
  }

  validateBasketForm(basket: any): boolean {
    const errors: any = {};
  
    // Validate Basket Name
    if (!basket.basketName || basket.basketName.trim().length < 3) {
      errors.basketName = 'Basket Name is required and must be at least 3 characters long.';
    }
  
    // Validate Billing Place
    if (!basket.billingPlace || basket.billingPlace.trim().length < 5) {
      errors.billingPlace = 'Billing Place is required and must be at least 5 characters long.';
    }
  
    // Validate Delivery Place
    if (!basket.deliveryPlace || basket.deliveryPlace.trim().length < 5) {
      errors.deliveryPlace = 'Delivery Place is required and must be at least 5 characters long.';
    }
  
    // Validate Vendor
    if (!basket.vendor || typeof basket.vendor !== 'object' || !basket.vendor.name) {
      errors.vendor = 'Vendor selection is required.';
    }
  
    // Validate Internal Note (Optional but must be meaningful if provided)
    if (basket.internalNote && basket.internalNote.trim().length < 5) {
      errors.internalNote = 'Internal Note must be at least 5 characters long if provided.';
    }
  
    // Validate Vendor Note (Optional but must be meaningful if provided)
    if (basket.vendorNote && basket.vendorNote.trim().length < 5) {
      errors.vendorNote = 'Vendor Note must be at least 5 characters long if provided.';
    }
  
    // Validate Create Items When
    if (!basket.createItemsWhen || isNaN(Date.parse(basket.createItemsWhen))) {
      errors.createItemsWhen = 'Create Items When is required and must be a valid date and time.';
    }
  
    // Display errors using Toastr or console
    Object.entries(errors).forEach(([field, message]) => {
      console.error(`${field}: ${message}`);
      this.toastr.error(message+'', 'Validation Error');
    });
  
    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  }
  

}
