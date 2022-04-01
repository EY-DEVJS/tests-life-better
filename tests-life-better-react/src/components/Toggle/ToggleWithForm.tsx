import {
  useFormContext,
  useController,
  FieldValues,
  Path,
} from "react-hook-form";
import React from "react";
import Toggle from "./index";
import { InputSwitchChangeParams } from "primereact/inputswitch";
import { ValidationRules } from "../../types/validation";

interface IProps<TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  text: string;
  rules: ValidationRules<TFieldValues> | undefined;
}

export const ToggleWithForm = <TFieldValues extends FieldValues>({
  id,
  text,
  rules,
}: IProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();
  const {
    field: { onChange, value },
  } = useController({
    name: id,
    control,
    rules,
  });

  const onToggle = (e: InputSwitchChangeParams) => {
    onChange(e.value);
  };

  return <Toggle text={text} onToggle={onToggle} id={id} checked={value} />;
};
