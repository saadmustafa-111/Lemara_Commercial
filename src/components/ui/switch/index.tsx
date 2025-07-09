import * as React from "react";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled, className, id, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked !== undefined ? checked : defaultChecked || false);
    
    // Update internal state when controlled value changes
    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (checked === undefined) {
        setIsChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <button
        type="button"
        role="switch"
        id={id}
        ref={ref}
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isChecked ? "bg-blue-500" : "bg-gray-200"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
        {...props}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
