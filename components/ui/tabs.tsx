import * as React from 'react'
import { cn } from '../../lib/utils'

export const Tabs = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col', className)} {...props}>{children}</div>
)

export const TabsList = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('inline-flex items-center rounded-md bg-muted p-1', className)} {...props}>{children}</div>
)

export const TabsTrigger = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn('inline-flex items-center px-3 py-1 rounded-md text-sm', className)} {...props}>{children}</button>
)

export const TabsContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-2', className)} {...props}>{children}</div>
)
