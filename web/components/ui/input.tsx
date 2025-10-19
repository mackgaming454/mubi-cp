import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode // Icon inside the input borders
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "relative flex items-center w-full rounded-md border border-input bg-transparent shadow-xs",
        "focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center pl-3 pr-2 text-muted-foreground pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex-1 h-9 bg-transparent placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none border-none px-3 py-1",
          icon ? "pl-0" : ""
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
