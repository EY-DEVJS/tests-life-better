import {Component, OnInit} from '@angular/core';
import {shippingService} from "../../shared/services/shipping.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public formValid: boolean = false;
  public orderCost: number = 106.97;
  public shippingCost: number = 0;
  public totalCost: number = 0;

  constructor(
    private shippingService: shippingService
  ) {
  }

  ngOnInit(): void {
    this.shippingService.currentShippingCostMessage.subscribe({
      next: (shippingCost) => {
        this.shippingCost = shippingCost;
        this.totalCost = this.orderCost + shippingCost;
      }
    })
    this.shippingService.currentFormValidationMessage.subscribe({
      next: (valid) => {
        this.formValid = valid;
      }
    })
  }

}
