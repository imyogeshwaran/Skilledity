import { LoadingSpinner } from "./loading-spinner"

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm transition-all duration-500">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-background/50 backdrop-blur-md shadow-2xl">
        <LoadingSpinner size="lg" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
} 