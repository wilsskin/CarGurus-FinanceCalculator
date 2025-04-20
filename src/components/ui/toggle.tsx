
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-colors border-2 border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[#1EAEDB] data-[state=on]:text-white data-[state=on]:border-[#1EAEDB] hover:bg-[#E9F6FB] min-w-[56px] py-3",
  {
    variants: {
      variant: {
        default: "bg-[#F5F7F9]",
        outline:
          "border border-input bg-transparent hover:bg-[#E9F6FB] hover:text-[#1EAEDB]",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 px-3.5",
        lg: "h-14 px-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
