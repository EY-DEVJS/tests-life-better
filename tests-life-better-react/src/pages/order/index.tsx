import React from "react";
import { useForm } from "react-hook-form";
import ShoppingForm from "../../components/ShoppingForm";

interface IProps {}

const OrderPage: React.FC<IProps> = ({}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ShoppingForm />
    </form>
  );
};

export default OrderPage;
