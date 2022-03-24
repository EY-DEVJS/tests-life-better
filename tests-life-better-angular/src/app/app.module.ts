import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StepperComponent,
    OrderFormComponent,
    CheckoutComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StepsModule,
    MenuModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    RadioButtonModule,
    ToggleButtonModule,
    InputSwitchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
