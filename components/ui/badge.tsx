import React from "react";

interface BadgeProps {
  label: string;
  color?: "green" | "red" | "gray";
}

export const Badge: React.FC<BadgeProps> = ({ label, color = "gray" }) => {
  const colorMap = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs rounded ${colorMap[color]}`}>
      {label}
    </span>
  );
};
