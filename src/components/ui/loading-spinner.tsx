import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md", ...props }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "loading-spinner rounded-full border-4 border-muted border-t-primary",
        {
          "h-4 w-4 border-2": size === "sm",
          "h-8 w-8": size === "md",
          "h-12 w-12": size === "lg",
        },
        className
      )}
      {...props}
    />
  )
} 