import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "light" | "dark" | "white"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "white", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-6",
          variant === "light" && "bg-section-light",
          variant === "dark" && "bg-section-dark",
          variant === "white" && "bg-background",
          className
        )}
        {...props}
      >
        <div className="mx-auto max-w-md px-4">
          {children}
        </div>
      </section>
    )
  }
)
Section.displayName = "Section"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-5", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SectionHeader.displayName = "SectionHeader"

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-foreground", className)}
        {...props}
      >
        {children}
      </h2>
    )
  }
)
SectionTitle.displayName = "SectionTitle"

interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionContent = React.forwardRef<HTMLDivElement, SectionContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-5", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SectionContent.displayName = "SectionContent"

export { Section, SectionHeader, SectionTitle, SectionContent }
