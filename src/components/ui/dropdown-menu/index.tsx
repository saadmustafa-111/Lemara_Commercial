import * as React from "react";

export interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
}) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  asChild,
}) => {
  return <>{children}</>;
};

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: "start" | "end" | "center";
  className?: string;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  align = "center",
  className = "",
}) => {
  return (
    <div 
      className={`absolute z-50 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
      style={{ 
        right: align === "end" ? 0 : "auto", 
        left: align === "start" ? 0 : align === "center" ? "50%" : "auto",
        transform: align === "center" ? "translateX(-50%)" : "none"
      }}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  className = "",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
