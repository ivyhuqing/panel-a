import React from "react";

interface PanelCardProps {
  children: React.ReactNode;
  className?: string;
}

export const PanelCard: React.FC<PanelCardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 mb-6 ${className || ''}`}>
      {children}
    </div>
  );
};

