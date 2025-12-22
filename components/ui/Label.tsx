import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
}

export function Label({ className, htmlFor, children, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
