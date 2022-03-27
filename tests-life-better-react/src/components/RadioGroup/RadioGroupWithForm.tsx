import { useFormContext, useController } from "react-hook-form";
import React from "react";
import RadioGroup from "./index";
import { IRadioData } from "../../data/formData";
import { RadioButtonChangeParams } from "primereact/radiobutton";

interface IProps {
  id: string;
  data: Array<IRadioData>;
}

export const RadioGroupWithForm: React.FC<IProps> = ({ id, data }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({
    name: id,
    control,
    defaultValue: false,
  });

  const onClick = (e: RadioButtonChangeParams) => {
    onChange(e.value);
  };

  return <RadioGroup data={data} onClick={onClick} chosenValue={value} />;
};
