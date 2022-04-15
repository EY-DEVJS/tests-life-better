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
  public consentMessage = 'Wyrażam zgodę na przesyłanie aktualnych promocji na wskazany adres mailowy.'
  public maxLength = 50;
  public paymentMethods: KeyValue<string, string>[] = [
    {key: 'Blik', value: 'BLIK'},
    {key: 'Karta', value: 'CC'},
    {key: 'Za pobraniem', value: 'CASH_ON_DELIVERY'},
  ]
  public shippingForm: FormGroup;
  public shippingProviders: any[] = [
    {key: 'Kurier (InPost)', value: 'INPOST', price: 10.95},
    {key: 'Kurier (Pocztex)', value: 'POCZTEX', price: 9.99},
    {key: 'Kurier (DHL)', value: 'DHL', price: 29.99},
    {key: 'Kurier (DPD)', value: 'DPD', price: 15.99},
  ]

  constructor(
    private readonly formBuilder: FormBuilder,
    private shippingService: shippingService
  ) {
    this.shippingForm = this.buildForm();
  }

  ngOnInit(): void {
    this.shippingForm.valueChanges.subscribe({
      next: (value) => {
        this.shippingService.updateShippingCost(value.shippingProvider);
      }
    })

    this.shippingService.currentFormValidationMessage.subscribe({
      next: () => {
        this.shippingForm.markAllAsTouched();
      }
    })
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
      lastName: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
      email: ['', [Validators.required, Validators.maxLength(this.maxLength), Validators.email]],
      postalCode: ['', [Validators.required, Validators.maxLength(this.maxLength), Validators.pattern('^[0-9]{2}-[0-9]{3}$')]],
      city: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
      streetAddress: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
      shippingDate: [null, Validators.required],
      shippingProvider: [null, Validators.required],
      paymentMethod: [null, Validators.required],
      consent: [false]
    })
  }
}
