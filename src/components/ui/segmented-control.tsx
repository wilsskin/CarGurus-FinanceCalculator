import * as React from "react"
import { cn } from "@/lib/utils"

interface SegmentedControlProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
  children: React.ReactNode
}

interface SegmentedControlItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

const SegmentedControlContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ value, onValueChange, className, children }, ref) => {
    return (
      <SegmentedControlContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          className={cn(
            "inline-flex w-full rounded-cg border border-input bg-muted overflow-hidden",
            className
          )}
          role="radiogroup"
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    )
  }
)
SegmentedControl.displayName = "SegmentedControl"

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ value, children, className }, ref) => {
    const context = React.useContext(SegmentedControlContext)
    
    if (!context) {
      throw new Error("SegmentedControlItem must be used within SegmentedControl")
    }

    const isActive = context.value === value

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isActive}
        onClick={() => context.onValueChange(value)}
        className={cn(
          "flex-1 py-4 px-3 text-sm font-medium transition-all duration-150 border-r border-input last:border-r-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent",
          className
        )}
      >
        {children}
      </button>
    )
  }
)
SegmentedControlItem.displayName = "SegmentedControlItem"

export { SegmentedControl, SegmentedControlItem }
