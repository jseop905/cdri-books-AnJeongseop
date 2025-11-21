import { ReactNode, createElement } from 'react'
import { cn } from '@shared/lib/cn'
import { TypographyVariant } from '@shared/config'

interface TypographyProps {
  children: ReactNode
  variant: TypographyVariant
  className?: string
  [key: string]: unknown
}

const variantClasses: Record<TypographyVariant, string> = {
  title1: 'text-title1 font-bold',
  title2: 'text-title2 font-bold',
  title3: 'text-title3 font-bold',
  body1: 'text-body1 font-medium',
  body2: 'text-body2 font-medium',
  body2Bold: 'text-body2-bold font-bold',
  caption: 'text-caption font-medium',
  small: 'text-small font-medium',
}

export const Typography = ({
  children,
  variant,
  className,
  ...props
}: TypographyProps) => {
  return createElement(
    'div',
    {
      className: cn(variantClasses[variant], className),
      ...props,
    },
    children
  )
}

