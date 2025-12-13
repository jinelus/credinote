/** biome-ignore-all lint/a11y/noLabelWithoutControl: <> */
import { forwardRef } from 'react'
import { cn } from '@/src/lib/utils'

const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label ref={ref} className={cn('font-medium text-slate-700 text-sm', className)} {...props} />
    )
  },
)

Label.displayName = 'Label'

export { Label }
