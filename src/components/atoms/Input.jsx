import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  placeholder,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={cn(
        "flex h-12 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-base transition-all duration-200",
        "placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20",
        "disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md focus:shadow-md",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;