import React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

/**
 * Reusable Select Component
 * VeyraTech Brand Design - Navy + Orange
 * Form select dropdown with label and error states
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
            {props.required && <span className="text-secondary ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border transition-all bg-primary-dark text-text-primary",
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              : "border-border focus:ring-2 focus:ring-secondary focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-primary-dark text-text-primary">
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
