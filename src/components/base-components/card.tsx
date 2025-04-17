import { cn } from "@/src/lib/utils"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white",
        className
      )}
      {...props}
    />
  )
} 