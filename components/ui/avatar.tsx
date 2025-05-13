import * as React from "react";

export function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
      {children}
    </div>
  );
}

export const AvatarImage = ({ src }: { src: string }) => (
  <img src={src} alt="" className="h-10 w-10 rounded-full object-cover" />
);

export const AvatarFallback = ({ label }: { label: string }) => (
  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-500">
    {label}
  </div>
);
