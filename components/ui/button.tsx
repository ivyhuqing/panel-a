import React from "react";
import clsx from "clsx"; // 必须要有这行

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyle = "rounded px-4 py-2 font-medium focus:outline-none transition";
  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  }[variant];

  const sizeStyle = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  return (
    <button className={clsx(baseStyle, variantStyle, sizeStyle, className)} {...props} />
  );
};
