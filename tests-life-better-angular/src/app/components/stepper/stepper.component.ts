import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class StepperComponent implements OnInit {
  items: MenuItem[] = [
    {label: 'Twój koszyk', icon: 'pi pi-repeat'},
    {label: 'Dostawa i sposób płatności'},
    {label: 'Płatność'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
