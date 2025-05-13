import React, { useState } from "react";

interface SwitchProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ defaultChecked = false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};
