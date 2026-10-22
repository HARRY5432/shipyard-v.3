import * as React from 'react';
import { Label } from '@/shared/components/atoms/Label';
import { cn } from '@/shared/lib/cn';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
}

export function FormField({
  label,
  children,
  error,
  required,
  helperText,
  className,
}: FormFieldProps) {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}-${React.useId()}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={fieldId} {...(required !== undefined ? { required } : {})}>
        {label}
      </Label>

      {/* Clone child to inject id and aria attributes */}
      {React.isValidElement(children) && React.cloneElement(children as React.ReactElement, {
        id: fieldId,
        'aria-invalid': !!error,
        'aria-describedby': [
          error ? errorId : undefined,
          helperText && !error ? helperId : undefined
        ].filter(Boolean).join(' ') || undefined,
        ...(error ? { error: true } : {}) // pass error prop down if component supports it (like our custom Input)
      })}

      {helperText && !error && (
        <p id={helperId} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-sm font-medium text-destructive animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
