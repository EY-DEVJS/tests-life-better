import { useFormContext, useController } from "react-hook-form";
import Input from "./index";
import React from "react";

interface IProps {
  id: string;
  label: string;
}

export const InputWithForm: React.FC<IProps> = ({ id, label }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController({
    name: id,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <Input
      label={label}
      onChange={onChange}
      id={id}
      value={value}
      validationMessage={error?.message}
      invalid={invalid}
      onBlur={onBlur}
    />
  );
};
