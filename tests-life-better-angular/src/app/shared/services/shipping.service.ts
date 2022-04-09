import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class shippingService {
  private shippingCostMessage: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public currentShippingCostMessage = this.shippingCostMessage.asObservable();
  private formValidationMessage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public currentFormValidationMessage = this.formValidationMessage.asObservable();

  constructor() {

  }

  public updateFormValidation(valid: boolean) {
    this.formValidationMessage.next(valid)
  }

  public updateShippingCost(cost: number) {
    this.shippingCostMessage.next(cost)
  }
}
