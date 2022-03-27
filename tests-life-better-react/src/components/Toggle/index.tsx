import React from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { InputSwitch, InputSwitchChangeParams } from "primereact/inputswitch";

interface IProps {
  text: string;
  onToggle: (e: InputSwitchChangeParams) => void;
  id: string;
  checked: boolean;
}

const Toggle: React.FC<IProps> = ({ onToggle, id, text, checked }) => {
  return (
    <div className="flex align-items-center">
      <InputSwitch checked={checked} onChange={onToggle} className="mx-3" />
      <label>{text}</label>
    </div>
  );
};

export default Toggle;
