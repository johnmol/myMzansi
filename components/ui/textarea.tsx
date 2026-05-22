import * as React from 'react'
import { cn } from '../../lib/utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('min-h-[80px] w-full resize-none rounded-md border p-3 text-sm', className)} {...props} />
  )
)
Textarea.displayName = 'Textarea'
