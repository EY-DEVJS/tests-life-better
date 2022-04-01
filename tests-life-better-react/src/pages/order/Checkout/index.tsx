import React from "react";
import { useFormContext } from "react-hook-form";
import { IShoppingForm } from "../ShoppingForm/ShoppingForm.types";

interface IProps {}

const Checkout: React.FC<IProps> = ({}) => {
  const { watch, handleSubmit } = useFormContext<IShoppingForm>();
  const shipping = watch("shipping");

  const onValid = (data: any) => {
    console.log("FORM IS VALID: ", data);
  };

  const onInvalid = (data: any) => {
    console.log("FORM IS INVALID: ", data);
  };

  return (
    <div>
      <div>Suma</div>
      {shipping && (
        <div>
          Koszt przesyłki: <span>{shipping.amount}</span>
        </div>
      )}
      <button onClick={handleSubmit(onValid, onInvalid)}>Zapłać</button>
    </div>
  );
};

export default Checkout;
