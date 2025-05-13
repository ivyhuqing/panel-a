import React from "react";

interface BadgeProps {
  label: string;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color = "bg-blue-100 text-blue-800" }) => {
  return (
    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${color}`}>
      {label}
    </span>
  );
};
