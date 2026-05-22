import * as React from 'react'
import { cn } from '../../lib/utils'

export const Dialog = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div role="dialog" className={cn('fixed inset-0 z-50 flex items-center justify-center', className)} {...props}>
      <div className={cn('bg-background p-4 rounded-lg shadow-lg')}>{children}</div>
    </div>
  )
}

export const DialogTrigger = ({ children, ...props }: any) => <>{children}</>
export const DialogContent = ({ children, className, ...props }: any) => (
  <div className={cn('bg-card p-6 rounded-lg', className)} {...props}>{children}</div>
)
