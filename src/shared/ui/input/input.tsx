import { InputHTMLAttributes } from 'react'
import { cn } from '@shared/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-body2 text-text-primary">
          {label}
        </label>
      )}
      <input 
        className={cn(
          'px-4 py-3 border border-palette-gray rounded-lg text-body1 transition-all duration-200',
          'focus:outline-none focus:border-palette-primary focus:ring-4 focus:ring-palette-primary/10',
          'placeholder:text-text-subtitle',
          className
        )}
        {...props}
      />
    </div>
  )
}

