import React from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

interface IProps {
  label: string;
  onChange: (value: string) => void;
  id: string;
  value: string;
  validationMessage: string | undefined;
  invalid: boolean;
  className?: string;
  onBlur: () => void;
}

const Input: React.FC<IProps> = ({
  onChange,
  value,
  id,
  label,
  validationMessage,
  invalid,
}) => {
  return (
    <div className="field">
      <label className="block" htmlFor={id}>
        {label}
      </label>
      <InputText
        className={classNames("block", invalid && "p-invalid")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        aria-errormessage={id}
        aria-invalid={invalid}
      />
      {validationMessage && (
        <small className="p-error" id={id}>
          {validationMessage}
        </small>
      )}
    </div>
  );
};

export default Input;
