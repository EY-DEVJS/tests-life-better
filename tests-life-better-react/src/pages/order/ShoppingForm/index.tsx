import React from "react";
import "primeflex/primeflex.css";
import { paymentData, shippingData } from "./ShoppingFormData";
import { InputWithForm } from "../../../components/Input/InputWithForm";
import { ToggleWithForm } from "../../../components/Toggle/ToggleWithForm";
import { RadioGroupWithForm } from "../../../components/RadioGroup/RadioGroupWithForm";
import { validation } from "./ShoppingForm.validation";
import { Steps } from "primereact/steps";

interface IProps {}

const items = [
  { label: "Twoj koszyk" },
  { label: "Dostawa i sposob platnosci" },
  { label: "Platnosc" },
];

const ShoppingForm: React.FC<IProps> = ({}) => {
  return (
    <div className="card border-solid mx-3 pb-5 pt-2">
      <Steps model={items} activeIndex={1} />
      <div className="flex">
        <div className="mx-5">
          <div className="card">
            <h5>Dane odbiorcy przesyłki</h5>
            <InputWithForm
              label="Imię"
              id="firstName"
              rules={validation.firstName}
            />
            <InputWithForm
              label="Nazwisko"
              id="lastName"
              rules={validation.lastName}
            />
            <InputWithForm label="E-mail" id="email" rules={validation.email} />
            <InputWithForm
              label="Kod pocztowy"
              id="postcode"
              rules={validation.postcode}
            />
            <InputWithForm label="Miasto" id="city" rules={validation.city} />
            <InputWithForm
              rules={validation.streetAddress}
              label="Ulica i numer domu/mieszkania"
              id="streetAddress"
            />
          </div>
        </div>
        <div>
          <div className="card">
            <h5>Dane doręczenia przesyłki</h5>
            <InputWithForm
              label="Data"
              id="shipping-date"
              rules={validation.date}
            />
          </div>
          <div className="card">
            <RadioGroupWithForm
              label="Dostawa na adres"
              data={shippingData}
              id="shipping"
              rules={validation.shipping}
            />
          </div>
          <div className="card">
            <RadioGroupWithForm
              label="Metoda płatności"
              data={paymentData}
              id="payment"
              rules={validation.payment}
            />
          </div>
        </div>
      </div>
      <ToggleWithForm
        rules={validation.sendPromotionsConsent}
        id="consent"
        text={
          "Wyrażam zgodę na przesyłanie aktualnych promocji na wskazany adres mailowy"
        }
      />
    </div>
  );
};

export default ShoppingForm;
