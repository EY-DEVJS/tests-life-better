import React from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

interface IProps {
  label: string;
  onChange: (value: string) => void;
  id: string;
  value: string;
  validationMessage: string;
  invalid: boolean;
  className?: string;
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
        className="block"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        aria-errormessage={id}
        aria-invalid={invalid}
      />
      {invalid && <div id={id}>{validationMessage}</div>}
    </div>
  );
};

export default Input;
