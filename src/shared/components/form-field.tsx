import { type ReactNode } from 'react'
import { Label } from './ui/label'
import { cn } from '../utils'

interface FormFieldProps {
  label?: string
  required?: boolean
  error?: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  required,
  error,
  description,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn(required && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
          {label}
        </Label>
      )}
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}