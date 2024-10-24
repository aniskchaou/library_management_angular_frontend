import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    public activeModal: NgbActiveModal,
    private basketService: HTTPService,
    private vendorService: HTTPService
  ) {}

  ngOnInit(): void {
    console.log(this.basket);
    this.loadVendors();
  }

  onSaveClick(): void {
   this.basket.vendor=this.vendors.find(item=>item.id===this.basket.vendor.id)
   console.log(this.basket)
      this.basketService.createBasket(this.basket).subscribe((newBasket) => {
        this.activeModal.close(newBasket);
      });
    
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe((data: Vendor[]) => {
      this.vendors = data;
    });
  }

}
