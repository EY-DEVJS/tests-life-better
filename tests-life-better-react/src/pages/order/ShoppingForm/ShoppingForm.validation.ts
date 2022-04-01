import { IShoppingForm } from "./ShoppingForm.types";
import { FormValidation } from "../../../types/validation";

export const validation: FormValidation<IShoppingForm> = {
  firstName: {
    required: {
      value: true,
      message: "Pole Imię nie może być puste",
    },
  },
  lastName: {
    required: {
      value: true,
      message: "Pole Nazwisko nie może być puste",
    },
  },
  city: {
    required: {
      value: true,
      message: "Pole Miasto nie może być puste",
    },
  },
  date: {
    required: {
      value: true,
      message: "Wybierz datę wysyłki",
    },
  },
  email: {
    required: {
      value: true,
      message: "Pole Email nie może być puste",
    },
  },
  payment: {
    required: {
      value: true,
      message: "Wybierz sposób płatności",
    },
  },
  postcode: {
    required: {
      value: true,
      message: "Pole Kod pocztowy nie może być puste",
    },
  },
  sendPromotionsConsent: {
    required: false,
  },
  shipping: {
    required: {
      value: true,
      message: "Wybierz sposób wysyłki",
    },
  },
  streetAddress: {
    required: {
      value: true,
      message: "To pole nie może być puste",
    },
  },
};
