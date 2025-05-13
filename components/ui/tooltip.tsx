import * as React from "react";

export function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
        Tooltip
      </div>
    </div>
  );
}

export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <span>{children}</span>;

export const TooltipContent = ({ children }: { children: React.ReactNode }) => <span>{children}</span>;
