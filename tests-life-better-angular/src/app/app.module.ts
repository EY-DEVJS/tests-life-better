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
    AppRoutingModule,
    StepsModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
