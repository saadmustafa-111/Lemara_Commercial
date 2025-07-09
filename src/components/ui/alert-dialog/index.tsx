import * as React from "react";

type AlertDialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContextType>({
  open: false,
  setOpen: () => {},
});

export const AlertDialog = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const setOpen = React.useCallback((value: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  }, [controlledOpen, onOpenChange]);

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

AlertDialog.displayName = "AlertDialog";

export const AlertDialogTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setOpen } = React.useContext(AlertDialogContext);
  
  // Just create a simple button that opens the dialog
  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  );

  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  );
};

AlertDialogTrigger.displayName = "AlertDialogTrigger";

export const AlertDialogContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open } = React.useContext(AlertDialogContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && contentRef.current) {
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={contentRef}
        role="alertdialog"
        aria-modal="true"
        className={`bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`space-y-2 mb-4 ${className}`}>{children}</div>;
};

AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
};

AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`text-gray-500 ${className}`}>{children}</div>;
};

AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogFooter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex justify-end space-x-2 mt-4 ${className}`}>
      {children}
    </div>
  );
};

AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogCancel = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = React.useContext(AlertDialogContext);

  return (
    <button
      type="button"
      className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${className}`}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </button>
  );
};

AlertDialogCancel.displayName = "AlertDialogCancel";

export const AlertDialogAction = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = React.useContext(AlertDialogContext);

  return (
    <button
      type="button"
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${className}`}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </button>
  );
};

AlertDialogAction.displayName = "AlertDialogAction";
