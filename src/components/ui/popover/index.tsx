import * as React from "react";

type PopoverContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
};

const PopoverContext = React.createContext<PopoverContextType>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
});

export const Popover = ({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
};

Popover.displayName = "Popover";

export const PopoverTrigger = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  const { open, setOpen, triggerRef } = React.useContext(PopoverContext);

  // Pass ref to the child if asChild is true
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        setOpen(!open);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
      "aria-expanded": open,
      "aria-haspopup": true,
    });
  }

  return (
    <button
      type="button"
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup={true}
    >
      {children}
    </button>
  );
};

PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = ({
  children,
  className = "",
  align = "center",
  side = "bottom",
  sideOffset = 4,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}) => {
  const { open, setOpen, triggerRef } = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Position the content relative to the trigger
  React.useEffect(() => {
    const positionContent = () => {
      if (!open || !triggerRef.current || !contentRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Position based on side
      switch (side) {
        case "top":
          top = triggerRect.top - contentRect.height - sideOffset;
          break;
        case "right":
          left = triggerRect.right + sideOffset;
          top = triggerRect.top;
          break;
        case "bottom":
          top = triggerRect.bottom + sideOffset;
          break;
        case "left":
          left = triggerRect.left - contentRect.width - sideOffset;
          top = triggerRect.top;
          break;
      }

      // Adjust horizontal alignment for top and bottom
      if (side === "top" || side === "bottom") {
        switch (align) {
          case "start":
            left = triggerRect.left;
            break;
          case "center":
            left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
            break;
          case "end":
            left = triggerRect.right - contentRect.width;
            break;
        }
      }

      // Adjust vertical alignment for left and right
      if (side === "left" || side === "right") {
        switch (align) {
          case "start":
            top = triggerRect.top;
            break;
          case "center":
            top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
            break;
          case "end":
            top = triggerRect.bottom - contentRect.height;
            break;
        }
      }

      // Apply positioning
      contentRef.current.style.position = "absolute";
      contentRef.current.style.top = `${top + window.scrollY}px`;
      contentRef.current.style.left = `${left + window.scrollX}px`;
      contentRef.current.style.zIndex = "50";
    };

    positionContent();
    window.addEventListener("resize", positionContent);
    window.addEventListener("scroll", positionContent);

    return () => {
      window.removeEventListener("resize", positionContent);
      window.removeEventListener("scroll", positionContent);
    };
  }, [open, align, side, sideOffset]);

  // Close on click outside
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        open &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={`bg-white rounded-md shadow-lg border border-gray-200 p-4 ${className}`}
      role="dialog"
    >
      {children}
    </div>
  );
};

PopoverContent.displayName = "PopoverContent";
