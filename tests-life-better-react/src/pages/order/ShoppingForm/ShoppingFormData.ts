import {
  IShoppingForm,
  PaymentType,
  ShippingType,
  ShippingValue,
} from "./ShoppingForm.types";

export interface IRadioData<ValueType> {
  displayValue: string;
  value: ValueType;
  additionalInfo?: number;
}
export const shippingData: Array<IRadioData<ShippingValue>> = [
  {
    displayValue: "Kurier (InPost)",
    additionalInfo: 10.95,
    value: {
      type: ShippingType.INPOST,
      amount: 10.95,
    },
  },
  {
    displayValue: "Kurier (Pocztex)",
    additionalInfo: 9.99,
    value: {
      type: ShippingType.POCZTEX,
      amount: 9.99,
    },
  },
  {
    displayValue: "Kurier (DHL)",
    additionalInfo: 29.99,
    value: {
      type: ShippingType.DHL,
      amount: 29.99,
    },
  },
  {
    displayValue: "Kurier (DPD)",
    additionalInfo: 15.99,
    value: {
      type: ShippingType.DPD,
      amount: 15.99,
    },
  },
];

export const paymentData: Array<IRadioData<PaymentType>> = [
  { displayValue: "Blik", value: PaymentType.BLIK },
  { displayValue: "Karta", value: PaymentType.CARD },
  { displayValue: "Za pobraniem", value: PaymentType.CASH },
];

export const defaultValues: IShoppingForm = {
  firstName: "",
  lastName: "",
  email: "",
  postcode: "",
  city: "",
  streetAddress: "",
  date: "",
  shipping: undefined,
  payment: undefined,
  sendPromotionsConsent: false,
};
