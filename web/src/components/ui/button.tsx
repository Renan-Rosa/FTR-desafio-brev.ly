import { Slot } from "@radix-ui/react-slot"
import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none",

  variants: {
    variant: {
      primary: "bg-blue-base text-white hover:bg-blue-dark",
      secondary: "bg-gray-200 border border-gray-200 hover:border-blue-base hover:text-blue-base",
      ghost: "bg-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100",
    },
    size: {
      sm: "px-3 py-2 text-text-sm",
      md: "px-4 py-3 text-text-md",
      lg: "px-6 py-4 text-text-lg",
      icon: "p-2",
      "icon-sm": "p-1",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ variant, size, className, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button"

  return (
    <Component
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}
