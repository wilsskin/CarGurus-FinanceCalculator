import * as React from "react";
import { cn } from "@/lib/utils";

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * AppShell - Main layout wrapper providing consistent gutters and max-width
 * 
 * - 16px (px-4) horizontal padding on mobile
 * - max-w-md (448px) for mobile-first flow
 * - Centered with mx-auto
 */
const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-md px-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AppShell.displayName = "AppShell";

export { AppShell };
