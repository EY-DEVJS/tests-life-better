import React from "react";
import RadioGroup from "./index";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
} from "react-hook-form";
import { IRadioData } from "../../pages/order/ShoppingForm/ShoppingFormData";
import { RadioButtonChangeParams } from "primereact/radiobutton";
import { ValidationRules } from "../../types/validation";

interface IProps<RadioValueType, TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  data: Array<IRadioData<RadioValueType>>;
  rules: ValidationRules<TFieldValues> | undefined;
  label: string;
}

export const RadioGroupWithForm = <
  RadioValueType,
  TFieldValues extends FieldValues
>({
  id,
  data,
  rules,
  label,
}: IProps<RadioValueType, TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController<TFieldValues>({
    name: id,
    rules,
    control,
    defaultValue: undefined,
  });

  const onClick = (e: RadioButtonChangeParams) => {
    onChange(e.value);
  };

  return (
    <RadioGroup
      label={label}
      data={data}
      onClick={onClick}
      chosenValue={value}
      validationMessage={error?.message}
      invalid={invalid}
      id={id}
    />
  );
};
