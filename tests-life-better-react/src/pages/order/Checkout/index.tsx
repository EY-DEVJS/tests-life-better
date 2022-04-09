import React from "react";
import { useFormContext } from "react-hook-form";
import { IShoppingForm } from "../ShoppingForm/ShoppingForm.types";
import { Button } from "primereact/button";

interface IProps {}

const Checkout: React.FC<IProps> = ({}) => {
  const { watch, handleSubmit } = useFormContext<IShoppingForm>();
  const shipping = watch("shipping");

  const onValid = (data: any) => {};

  const onInvalid = (data: any) => {};

  return (
    <div>
      <div className="card border-solid p-2 w-20rem">
        <h3 className="mt-3 mb-2">Do zapłaty</h3>
        <div className="text-4xl text-right" data-testid="price-base">
          106.97
        </div>
        {shipping && (
          <div className="text-right text-xs mb-4" data-testid="price-shipping">
            + dostawa <span>{shipping.amount}</span>
          </div>
        )}
        <div className="flex justify-content-between mb-3">
          <span className="text-5xl">Suma </span>
          <span className="text-5xl" data-testid="price-total">
            {shipping ? shipping.amount + 106.97 : 106.97}
          </span>
        </div>
        <div className="flex flex-column align-content-center">
          <Button
            label="Zapłać"
            className="p-button-secondary mb-2 text-center"
            onClick={handleSubmit(onValid, onInvalid)}
          />

          <div className="text-sm mb-2 text-center">KONTYNUJ ZAKUPY</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
