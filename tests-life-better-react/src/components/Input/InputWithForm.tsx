import {
  useFormContext,
  useController,
  FieldValues,
  Path,
} from "react-hook-form";
import { ValidationRules } from "../../types/validation";
import Input from "./index";
import React from "react";

interface IProps<TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  label: string;
  rules: ValidationRules<TFieldValues> | undefined;
}

export const InputWithForm = <TFieldValues extends FieldValues>({
  id,
  label,
  rules,
}: IProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController<TFieldValues>({
    name: id,
    control,
    rules,
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
