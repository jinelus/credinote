import { forwardRef } from 'react'
import { cn } from '@/src/lib/utils'

const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'block w-full rounded-md border-0 py-1.5 pr-10 pl-3 text-slate-900 ring-1 ring-slate-300 ring-inset focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    )
  },
)

Select.displayName = 'Select'

export { Select }
