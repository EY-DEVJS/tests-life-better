import { useFormContext, useController } from "react-hook-form";
import React from "react";
import Toggle from "./index";
import { InputSwitchChangeParams } from "primereact/inputswitch";

interface IProps {
  id: string;
  text: string;
}

export const ToggleWithForm: React.FC<IProps> = ({ id, text }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({
    name: id,
    control,
    defaultValue: false,
  });

  const onToggle = (e: InputSwitchChangeParams) => {
    onChange(e.value);
  };

  return <Toggle text={text} onToggle={onToggle} id={id} checked={value} />;
};
