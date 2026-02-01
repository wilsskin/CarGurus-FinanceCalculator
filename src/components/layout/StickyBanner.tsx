import * as React from "react";
import { cn } from "@/lib/utils";

interface StickyBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Whether the banner is currently in sticky/compact mode */
  isSticky?: boolean;
}

interface BannerValueProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  /** Primary values use accent color, secondary use neutral */
  variant?: "primary" | "secondary";
}

/**
 * StickyBanner - Summary banner with 16px gutter alignment
 * 
 * - 16px (px-4) horizontal padding matching AppShell
 * - 8px (py-2) vertical padding for compact height
 * - Smooth transition between static and sticky states
 */
const StickyBanner = React.forwardRef<HTMLDivElement, StickyBannerProps>(
  ({ className, children, isSticky = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full bg-white border-b border-border shadow-sm transition-all duration-300 z-30",
          isSticky && "fixed top-0 left-0 right-0",
          className
        )}
        {...props}
      >
        <div className="mx-auto max-w-md px-4 py-2">
          {children}
        </div>
      </div>
    );
  }
);
StickyBanner.displayName = "StickyBanner";

/**
 * BannerContent - Main content area with flex layout
 */
const BannerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
});
BannerContent.displayName = "BannerContent";

/**
 * BannerTitle - Section title with consistent styling
 * 
 * - font-bold text-foreground (neutral black)
 * - text-sm for compact display
 */
const BannerTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-sm font-bold text-foreground", className)}
      {...props}
    >
      {children}
    </span>
  );
});
BannerTitle.displayName = "BannerTitle";

/**
 * BannerValue - Individual value display with label
 * 
 * - Consistent typography for monthly/total values
 * - Primary variant uses accent color for emphasis
 * - Secondary variant uses neutral foreground
 */
const BannerValue = React.forwardRef<HTMLDivElement, BannerValueProps>(
  ({ className, label, value, variant = "primary", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-end min-w-[80px]", className)}
        {...props}
      >
        <span className="text-xs text-muted-foreground font-medium">
          {label}
        </span>
        <span
          className={cn(
            "font-bold leading-tight",
            variant === "primary" 
              ? "text-lg text-primary" 
              : "text-sm text-foreground"
          )}
        >
          {value}
        </span>
      </div>
    );
  }
);
BannerValue.displayName = "BannerValue";

/**
 * BannerHelper - Helper text or badge area
 * 
 * - text-xs text-muted-foreground
 * - Use for "Estimated" badge or confidence indicators
 */
const BannerHelper = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    >
      {children}
    </span>
  );
});
BannerHelper.displayName = "BannerHelper";

export { 
  StickyBanner, 
  BannerContent, 
  BannerTitle, 
  BannerValue, 
  BannerHelper 
};
