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
}

const RadioGroup = <RadioValueType,>({
  onClick,
  data,
  chosenValue,
  validationMessage,
  invalid,
  id,
}: IProps<RadioValueType>) => {
  return (
    <>
      {data.map(({ value, additionalInfo, displayValue }) => (
        <div
          className="field-radiobutton"
          key={displayValue}
          data-testid={`${displayValue}-wrapper`}
          aria-invalid={invalid}
        >
          <RadioButton
            value={value}
            inputId={displayValue}
            name={id}
            onChange={onClick}
            checked={JSON.stringify(chosenValue) === JSON.stringify(value)}
            className={classNames("block", invalid && "p-invalid")}
          />
          <label
            aria-labelledby={displayValue}
            htmlFor={displayValue}
            className="mx-5"
          >
            {displayValue}
          </label>
          {additionalInfo && <span> {`${additionalInfo} PLN`}</span>}
        </div>
      ))}
      {validationMessage && (
        <small className="p-error">{validationMessage}</small>
      )}
    </>
  );
};

export default RadioGroup;
