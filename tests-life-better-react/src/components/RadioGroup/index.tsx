import React from "react";
import { RadioButton, RadioButtonChangeParams } from "primereact/radiobutton";
import { IRadioData } from "../../pages/order/ShoppingForm/ShoppingFormData";
import classNames from "classnames";

interface IProps<RadioValueType> {
  onClick: (e: RadioButtonChangeParams) => void;
  data: Array<IRadioData<RadioValueType>>;
  chosenValue: RadioValueType;
  invalid: boolean;
  validationMessage: string | undefined;
  id: string;
  label: string;
}

const RadioGroup = <RadioValueType,>({
  onClick,
  data,
  chosenValue,
  validationMessage,
  invalid,
  id,
  label,
}: IProps<RadioValueType>) => {
  return (
    <>
      <h5>
        <label htmlFor={id}>{label}</label>
      </h5>
      {data.map(({ value, additionalInfo, displayValue }) => (
        <div className="field-radiobutton" key={displayValue}>
          <RadioButton
            value={value}
            inputId={id}
            name={displayValue}
            onChange={onClick}
            checked={chosenValue === value}
            className={classNames("block", invalid && "p-invalid")}
          />
          <div className="flex justify-content-between">
            <label htmlFor={id} className="mx-5">
              {displayValue}
            </label>
            {additionalInfo && <span> {`${additionalInfo} PLN`}</span>}
          </div>
        </div>
      ))}
      {validationMessage && (
        <small className="p-error">{validationMessage}</small>
      )}
    </>
  );
};

export default RadioGroup;
