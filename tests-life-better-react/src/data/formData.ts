// @ts-ignore
export interface IRadioData {
  value: string;
  additionalInfo?: number;
}
export const shippingData: Array<IRadioData> = [
  { value: "Kurier (InPost)", additionalInfo: 10.95 },
  { value: "Kurier (Pocztex)", additionalInfo: 9.99 },
  { value: "Kurier (DHL)", additionalInfo: 29.99 },
  { value: "Kurier (DPD)", additionalInfo: 15.99 },
];

export const paymentData: Array<IRadioData> = [
  { value: "Blik" },
  { value: "Karta" },
  { value: "Za pobraniem" },
];
