import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingProps {
  state?: boolean
}

export function Loading ({state = false}: LoadingProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(state)
  }, [state])

  return (
    isLoading === true && (
      <div className="w-full text-center flex justify-center">
        <Loader2Icon className="animate-spin"/>
      </div>
    )
  )
}