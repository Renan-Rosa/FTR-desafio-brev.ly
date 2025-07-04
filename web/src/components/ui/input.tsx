import { Slot } from "@radix-ui/react-slot"
import type { ComponentProps } from "react"
import { forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Warning } from "../../assets/icons/warning"

const inputVariants = tv({
  slots: {
    container: "flex flex-col gap-2",
    label: "text-xs font-semibold uppercase tracking-wide transition-colors duration-200",
    input: "px-4 py-3 rounded-lg text-text-md transition-all duration-200 focus:outline-none",
    errorMessage: "flex items-center gap-2 text-text-sm text-danger",
    errorIcon: "flex-shrink-0",
  },
  variants: {
    state: {
      default: {
        label: "text-gray-500",
        input: "border border-gray-200 focus:ring-2 focus:ring-blue-base focus:border-transparent",
      },
      active: {
        label: "text-blue-base",
        input: "border-2 border-blue-base ring-2 ring-blue-base/20",
      },
      error: {
        label: "text-danger",
        input: "border-2 border-danger ring-2 ring-danger/20",
      },
      disabled: {
        label: "text-gray-400",
        input: "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
})

type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    label?: string
    error?: string
    asChild?: boolean
  }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ state, label, error, className, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : "input"
    const variants = inputVariants({ state: error ? "error" : state })

    return (
      <div className={variants.container()}>
        {label && <label className={variants.label()}>{label}</label>}

        <Component ref={ref} className={variants.input({ className })} {...props} />

        {error && (
          <div className={variants.errorMessage()}>
            <Warning />
            {error}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"
