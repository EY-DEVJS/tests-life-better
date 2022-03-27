import React from "react";
import { RadioButton, RadioButtonChangeParams } from "primereact/radiobutton";
import { IRadioData } from "../../data/formData";

interface IProps {
  onClick: (e: RadioButtonChangeParams) => void;
  data: Array<IRadioData>;
  chosenValue: String;
}

const RadioGroup: React.FC<IProps> = ({ onClick, data, chosenValue }) => {
  return (
    <>
      {data.map(({ value, additionalInfo }) => (
        <div className="field-radiobutton">
          <RadioButton
            value={value}
            inputId={value}
            name={value}
            onChange={onClick}
            checked={chosenValue === value}
          />
          <label htmlFor={value} className="mx-5">
            {value}
          </label>
          {additionalInfo && <span> {`${additionalInfo} PLN`}</span>}
        </div>
      ))}
    </>
  );
};

export default RadioGroup;
