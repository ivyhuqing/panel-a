import { ReactNode } from "react";

export function PanelCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {children}
    </div>
  );
}
