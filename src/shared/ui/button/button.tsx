import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@shared/lib/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
}

const variantStyles = {
  primary: 'bg-palette-primary text-palette-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'bg-palette-gray text-text-primary hover:bg-palette-gray/80 disabled:opacity-50 disabled:cursor-not-allowed',
  text: 'bg-transparent text-palette-primary hover:bg-palette-lightGray disabled:opacity-50 disabled:cursor-not-allowed',
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={cn(
        'flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        'w-[115px] h-12 px-5 py-[13px]',
        variantStyles[variant],
        className
      )}
      style={{
        gap: '10px',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

