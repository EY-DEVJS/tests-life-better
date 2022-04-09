import { IShoppingForm } from "./ShoppingForm.types";
import { FormValidation } from "../../../types/validation";

const maxLength = {
  maxLength: {
    value: 50,
    message: "Zawartość musi być krótsza niz 50 znaków",
  },
};

export const validation: FormValidation<IShoppingForm> = {
  firstName: {
    required: {
      value: true,
      message: "Pole Imię nie może być puste",
    },
    ...maxLength,
  },
  lastName: {
    required: {
      value: true,
      message: "Pole Nazwisko nie może być puste",
    },
    ...maxLength,
  },
  city: {
    required: {
      value: true,
      message: "Pole Miasto nie może być puste",
    },
    ...maxLength,
  },
  date: {
    required: {
      value: true,
      message: "Wybierz datę wysyłki",
    },
    ...maxLength,
  },
  email: {
    required: {
      value: true,
      message: "Pole Email nie może być puste",
    },
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      message: "Wymagany poprawny email",
    },
    ...maxLength,
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
    ...maxLength,
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
    ...maxLength,
  },
};
