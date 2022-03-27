import React from "react";
import { RadioButton } from "primereact/radiobutton";

interface IProps {
  label: string;
  onChange: (value: string) => void;
  data: Array<string>;
  value: String;
}

const RadioGroup: React.FC<IProps> = ({ onChange, data, label, value }) => {
  return (
    <span>
      <span>{label}</span>
      {data.map((element) => (
        <RadioButton
          value={element}
          name={element}
          onChange={(e) => onChange(e.value)}
          checked={element === value}
        />
      ))}
    </span>
  );
};
