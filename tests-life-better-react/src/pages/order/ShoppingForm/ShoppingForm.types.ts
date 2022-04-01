import { FieldValues } from "react-hook-form";

export enum ShippingType {
  INPOST = "inpost",
  POCZTEX = "pocztex",
  DHL = "dhl",
  DPD = "dpd",
}

export enum PaymentType {
  BLIK = "blik",
  CARD = "card",
  CASH = "cash",
}

export type ShippingValue = {
  type: ShippingType;
  amount: number;
};

export interface IShoppingForm extends FieldValues {
  firstName: string;
  lastName: string;
  email: string;
  postcode: string;
  city: string;
  streetAddress: string;
  date: string;
  shipping: ShippingValue | undefined;
  payment: PaymentType | undefined;
  sendPromotionsConsent: boolean;
}
