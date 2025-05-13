import React from "react";

interface ButtonProps {
  label?: string; // 👈 改为可选，防止将来忘记传
  onClick?: () => void;
  children?: React.ReactNode;
  ...
}


export const Button: React.FC<ButtonProps> = ({ label, variant = "primary", ...props }) => {
  const base = "px-4 py-2 rounded font-semibold text-sm";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button {...props} className={`${base} ${variants[variant]}`}>
      {label}
    </button>
  );
};


