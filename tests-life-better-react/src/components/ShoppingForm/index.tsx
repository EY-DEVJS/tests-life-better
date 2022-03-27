import React from "react";
import Input from "../Input";

interface IProps {}

const ShoppingForm: React.FC<IProps> = ({}) => {
  const onChange = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="card">
        <h5>Dane odbiorcy przesyłki</h5>
        <Input
          label="Imię"
          onChange={onChange}
          id="first-name"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
        <Input
          label="Nazwisko"
          onChange={onChange}
          id="last-name"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
        <Input
          label="E-mail"
          onChange={onChange}
          id="email"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
        <Input
          label="Kod pocztowy"
          onChange={onChange}
          id="postal-code"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
        <Input
          label="Miasto"
          onChange={onChange}
          id="city"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
        <Input
          label="Ulica i numer domu/mieszkania"
          onChange={onChange}
          id="street-adress"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
      </div>
      <div className="card">
        <h5>Dane doręczenia przesyłki</h5>
        <Input
          label="Data"
          onChange={onChange}
          id="shipping-date"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
      </div>
      <div className="card">
        <h5>Dostawa na adres</h5>
        <Input
          label="Data"
          onChange={onChange}
          id="shipping-date"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
      </div>
      <div className="card">
        <h5>Metoda płatności</h5>
        <Input
          label="Data"
          onChange={onChange}
          id="shipping-date"
          value={"test"}
          validationMessage={"valiadtion"}
          invalid={false}
        />
      </div>
    </div>
  );
};

export default ShoppingForm;
