import * as React from "react";

type TabsRootProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export const Tabs = ({ defaultValue, value, onValueChange, children, className }: TabsRootProps) => {
  const [selectedTab, setSelectedTab] = React.useState(value || defaultValue || "");

  const handleValueChange = React.useCallback((newValue: string) => {
    setSelectedTab(newValue);
    onValueChange?.(newValue);
  }, [onValueChange]);

  // Update internal state when controlled value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedTab(value);
    }
  }, [value]);

  return (
    <TabsContext.Provider value={{ value: selectedTab, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.displayName = "Tabs";

export const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div role="tablist" className={`flex ${className || ""}`}>
      {children}
    </div>
  );
};

TabsList.displayName = "TabsList";

export const TabsTrigger = ({
  children,
  value,
  className,
  disabled,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}) => {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 text-sm font-medium ${
        isSelected
          ? "border-b-2 border-primary text-primary"
          : "text-gray-500 hover:text-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className || ""}`}
    >
      {children}
    </button>
  );
};

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (selectedValue !== value) {
    return null;
  }

  return (
    <div role="tabpanel" className={className || ""}>
      {children}
    </div>
  );
};

TabsContent.displayName = "TabsContent";
