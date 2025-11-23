import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import type { PaletteColor } from '@shared/config/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: PaletteColor
  onClick?: () => void
}

const variantStyles: Record<PaletteColor, string> = {
  primary: 'bg-palette-primary text-palette-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
  red: 'bg-palette-red text-palette-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
  gray: 'bg-palette-gray text-text-primary hover:bg-palette-gray/80 disabled:opacity-50 disabled:cursor-not-allowed',
  lightGray: 'bg-palette-lightGray text-text-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
  white: 'bg-palette-white text-text-primary hover:bg-palette-lightGray disabled:opacity-50 disabled:cursor-not-allowed',
  black: 'bg-palette-black text-palette-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
}

const baseStyles = 'flex items-center justify-center font-medium transition-all duration-200'

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick,
  ...props 
}: ButtonProps) => {
  const variantStyle = variantStyles[variant] || ''
  const combinedClassName = clsx(baseStyles, variantStyle, className)
  
  return (
    <button 
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

