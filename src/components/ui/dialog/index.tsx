import * as React from "react";

interface DialogProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full max-h-[85vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

interface DialogTriggerProps {
  children: React.ReactNode;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
}) => {
  return <>{children}</>;
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h2 className={`text-xl font-semibold ${className}`}>
      {children}
    </h2>
  );
};

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({
  children,
  className = "",
}) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
};

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex justify-end space-x-2 mt-4 ${className}`}>
      {children}
    </div>
  );
};
