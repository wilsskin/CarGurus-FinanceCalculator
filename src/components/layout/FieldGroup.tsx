import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface FieldLabelProps extends React.ComponentProps<typeof Label> {
  children: React.ReactNode;
  required?: boolean;
}

interface FieldHelperProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

/**
 * FieldGroup - Consistent form field wrapper
 * 
 * - 8px (space-y-2) spacing between label and input
 * - Standard structure: Label -> Input -> Helper/Error
 */
const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FieldGroup.displayName = "FieldGroup";

/**
 * FieldLabel - Consistent label styling (CarGurus style)
 * 
 * - text-label (14px) font-medium
 * - text-foreground for primary labels
 */
const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <Label
        ref={ref}
        className={cn(
          "text-label font-medium text-foreground",
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
    );
  }
);
FieldLabel.displayName = "FieldLabel";

/**
 * FieldHelper - Helper text below input (CarGurus style)
 * 
 * - text-body-sm text-muted-foreground
 * - Use for hints and additional context
 */
const FieldHelper = React.forwardRef<HTMLParagraphElement, FieldHelperProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-body-sm text-muted-foreground mt-1", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FieldHelper.displayName = "FieldHelper";

/**
 * FieldError - Error message below input
 * 
 * - text-sm text-destructive
 * - Only render when there's an error
 */
const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-destructive", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FieldError.displayName = "FieldError";

export { FieldGroup, FieldLabel, FieldHelper, FieldError };
