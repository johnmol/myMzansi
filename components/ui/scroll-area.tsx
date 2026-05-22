import * as React from 'react'
import { cn } from '../../lib/utils'

export const ScrollArea = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('overflow-auto', className)} {...props}>{children}</div>
)
