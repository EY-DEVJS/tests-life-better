import {Injectable} from "@angular/core";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class shippingService {
  private formValidationMessage: Subject<boolean> = new ReplaySubject<boolean>();
  public currentFormValidationMessage = this.formValidationMessage.asObservable();
  private shippingCostMessage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public currentShippingCostMessage = this.shippingCostMessage.asObservable();

  constructor() {

  }

  public checkFormValidation() {
    this.formValidationMessage.next(true)
  }

  public updateShippingCost(cost: number) {
    this.shippingCostMessage.next(cost)
  }
}
