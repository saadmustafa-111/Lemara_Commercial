import * as React from "react";
import { useState, useRef, useEffect } from "react";

interface SelectProps {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ children, value, defaultValue, onValueChange, disabled, placeholder, className }, ref) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || "");
    const selectRef = useRef<HTMLDivElement>(null);

    // Update internal state when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // Handle outside clicks to close the dropdown
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    // Pass the actual React children to be rendered
    return (
      <div ref={selectRef} className={`relative ${className}`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              open,
              setOpen,
              value: selectedValue,
              onValueChange: (val: string) => {
                setSelectedValue(val);
                onValueChange?.(val);
                setOpen(false);
              },
              disabled,
              placeholder,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

Select.displayName = "Select";

interface SelectTriggerProps {
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  disabled?: boolean;
}

export const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ children, className = "", open, setOpen, disabled }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
        onClick={() => !disabled && setOpen?.(!open)}
        aria-expanded={open}
        role="combobox"
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${open ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
  value?: string;
}

export const SelectValue = React.forwardRef<HTMLDivElement, SelectValueProps>(
  ({ placeholder, children, value }, ref) => {
    return (
      <div ref={ref} className="flex-grow">
        {value ? children : <span className="text-gray-400">{placeholder}</span>}
      </div>
    );
  }
);

SelectValue.displayName = "SelectValue";

interface SelectContentProps {
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className = "", open }, ref) => {
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        className={`absolute z-50 w-full mt-1 py-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = "SelectContent";

interface SelectItemProps {
  children?: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className = "", value, disabled, onValueChange }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
        onClick={() => !disabled && onValueChange?.(value)}
        role="option"
        aria-selected={false}
      >
        {children}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";


