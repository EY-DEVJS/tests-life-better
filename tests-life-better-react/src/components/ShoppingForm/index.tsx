import React from "react";
import "primeflex/primeflex.css";
import { paymentData, shippingData } from "../../data/formData";
import { InputWithForm } from "../Input/InputWithForm";
import { ToggleWithForm } from "../Toggle/ToggleWithForm";
import { RadioGroupWithForm } from "../RadioGroup/RadioGroupWithForm";

interface IProps {}

const ShoppingForm: React.FC<IProps> = ({}) => {
  return (
    <div>
      <div className="flex">
        <div className="mx-5">
          <div className="card">
            <h5>Dane odbiorcy przesyłki</h5>
            <InputWithForm label="Imię" id="first-name" />
            <InputWithForm label="Nazwisko" id="last-name" />
            <InputWithForm label="E-mail" id="email" />
            <InputWithForm label="Kod pocztowy" id="postal-code" />
            <InputWithForm label="Miasto" id="city" />
            <InputWithForm
              label="Ulica i numer domu/mieszkania"
              id="street-adress"
            />
          </div>
        </div>
        <div>
          <div className="card">
            <h5>Dane doręczenia przesyłki</h5>
            <InputWithForm label="Data" id="shipping-date" />
          </div>
          <div className="card">
            <h5>Dostawa na adres</h5>
            <RadioGroupWithForm data={shippingData} id="shipping-provider" />
          </div>
          <div className="card">
            <h5>Metoda płatności</h5>
            <RadioGroupWithForm data={paymentData} id="payment-method" />
          </div>
        </div>
      </div>
      <ToggleWithForm
        id="consent"
        text={
          "Wyrażam zgodę na przesyłanie aktualnych promocji na wskazany adres mailowy"
        }
      />
    </div>
  );
};

export default ShoppingForm;
