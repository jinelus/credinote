import { forwardRef } from 'react'
import { cn } from '@/src/lib/utils'


const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium text-slate-700',
          className
        )}
        {...props}
      />
    )
  }
)

Label.displayName = 'Label'

export { Label } 