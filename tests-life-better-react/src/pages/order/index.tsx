import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import ShoppingForm from "../../components/ShoppingForm";

interface IProps {}

const OrderPage: React.FC<IProps> = ({}) => {
  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ShoppingForm />
      </form>
    </FormProvider>
  );
};

export default OrderPage;
