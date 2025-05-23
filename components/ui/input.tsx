import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-text-main shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
