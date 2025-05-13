import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
    >
      {children}
    </button>
  );
}
