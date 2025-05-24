import { useEffect, useState } from "react"
import { useRouter } from "next/router"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleStart = () => {
      setIsTransitioning(true)
    }

    const handleComplete = () => {
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1000) // 1 second transition
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])

  return (
    <div
      className={`transition-all duration-1000 ease-in-out ${
        isTransitioning
          ? "opacity-0 scale-95 blur-sm"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      {children}
    </div>
  )
} 