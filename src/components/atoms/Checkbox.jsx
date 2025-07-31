import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-150 ease-out checkbox-animation",
        checked 
          ? "bg-primary border-primary text-white" 
          : "border-gray-300 hover:border-gray-400 bg-white",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={14} 
          className="animate-check" 
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;