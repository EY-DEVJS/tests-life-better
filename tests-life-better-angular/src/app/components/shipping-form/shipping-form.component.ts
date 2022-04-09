import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {shippingService} from "../../shared/services/shipping.service";

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  shippingForm: FormGroup;

  shippingProviders: any[] = [
    {key: 'Kurier (InPost)', value: 'INPOST', price: 10.95},
    {key: 'Kurier (Pocztex)', value: 'POCZTEX', price: 9.99},
    {key: 'Kurier (DHL)', value: 'DHL', price: 29.99},
    {key: 'Kurier (DPD)', value: 'DPD', price: 15.99},
  ]

  paymentMethods: KeyValue<string, string>[] = [
    {key: 'Blik', value: 'BLIK'},
    {key: 'Karta', value: 'CC'},
    {key: 'Za pobraniem', value: 'CASH_ON_DELIVERY'},
  ]

  consentMessage = 'Wyrażam zgodę na przesyłanie aktualnych promocji na wskazany adres mailowy.'

  constructor(
    private readonly formBuilder: FormBuilder,
    private shippingService: shippingService
  ) {
    this.shippingForm = this.buildForm();
  }

  ngOnInit(): void {
    this.shippingForm.valueChanges.subscribe({
      next: (value) => {
        console.log("-> value", value);
        this.shippingService.updateShippingCost(value.shippingProvider);
        this.shippingService.updateFormValidation(this.shippingForm.valid);
      }
    })
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      streetAddress: ['', Validators.required],
      shippingDate: [null, Validators.required],
      shippingProvider: [null, Validators.required],
      paymentMethod: [null, Validators.required],
      consent: [false]
    })
  }
}
