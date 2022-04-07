import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Checkout from "./Checkout";
import ShoppingForm from "./ShoppingForm";
import { IShoppingForm } from "./ShoppingForm/ShoppingForm.types";
import { defaultValues } from "./ShoppingForm/ShoppingFormData";
interface IProps {}

const OrderPage: React.FC<IProps> = ({}) => {
  const methods = useForm<IShoppingForm>({ defaultValues, mode: "all" });

  return (
    <FormProvider {...methods}>
      <div className="flex">
        <ShoppingForm />
        <Checkout />
      </div>
    </FormProvider>
  );
};

export default OrderPage;
