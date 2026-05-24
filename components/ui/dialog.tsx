import * as React from 'react'
import { cn } from '../../lib/utils'

type DivProps = React.HTMLAttributes<HTMLDivElement>

export const Dialog: React.FC<DivProps> = ({ children, className, ...props }) => {
  return (
    <div role="dialog" className={cn('fixed inset-0 z-50 flex items-center justify-center', className)} {...props}>
      <div className={cn('bg-background p-4 rounded-lg shadow-lg')}>{children}</div>
    </div>
  )
}

export const DialogTrigger: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => <>{children}</>
export const DialogContent: React.FC<DivProps> = ({ children, className, ...props }) => (
  <div className={cn('bg-card p-6 rounded-lg', className)} {...props}>{children}</div>
)
