import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {

  shippingForm: FormGroup;

  shippingProviders: KeyValue<string, string>[] = [
    {key: 'Kurier (InPost)', value: 'INPOST'},
    {key: 'Kurier (Pocztex)', value: 'POCZTEX'},
    {key: 'Kurier (DHL)', value: 'DHL'},
    {key: 'Kurier (DPD)', value: 'DPD'},
  ]

  paymentMethods: KeyValue<string, string>[] = [
    {key: 'Blik', value: 'BLIK'},
    {key: 'Karta', value: 'CC'},
    {key: 'Za pobraniem', value: 'CASH_ON_DELIVERY'},
  ]

  consentMessage = 'Wyrażam zgodę na przesyłanie aktualnych promocji na wskazany adres mailowy.'

  constructor(private readonly formBuilder: FormBuilder) {
    this.shippingForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      postalCode: [''],
      city: [''],
      streetAddress: [''],
      shippingDate: [null],
      shippingProvider: [null],
      paymentMethod: [null],
      consent: [false],

    })
  }
}
