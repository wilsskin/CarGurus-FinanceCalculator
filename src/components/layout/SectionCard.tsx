import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface SectionCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface SectionCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * SectionCard - Consistent card wrapper for page sections
 * 
 * - 16px (p-4) internal padding
 * - Rounded corners matching shadcn Card
 * - White background with subtle shadow
 */
const SectionCard = React.forwardRef<HTMLDivElement, SectionCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "bg-card rounded-xl shadow-sm p-4",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);
SectionCard.displayName = "SectionCard";

/**
 * SectionCardHeader - Header area with consistent spacing
 * 
 * - 16px (mb-4) bottom margin
 * - Headings should use text-foreground (neutral black)
 */
const SectionCardHeader = React.forwardRef<HTMLDivElement, SectionCardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SectionCardHeader.displayName = "SectionCardHeader";

/**
 * SectionCardContent - Content area with consistent spacing
 * 
 * - 24px (space-y-6) vertical spacing between major blocks
 * - Use space-y-4 for tighter groupings within
 */
const SectionCardContent = React.forwardRef<HTMLDivElement, SectionCardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SectionCardContent.displayName = "SectionCardContent";

export { SectionCard, SectionCardHeader, SectionCardContent };
