import { ReactNode, useState, useRef, useEffect } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  showOnlyWhenOverflow?: boolean
}

export const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  showOnlyWhenOverflow = true 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [shouldShow, setShouldShow] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && showOnlyWhenOverflow) {
      const element = wrapperRef.current.firstChild as HTMLElement
      if (element) {
        const isOverflowing = element.scrollWidth > element.clientWidth
        setShouldShow(isOverflowing)
      }
    } else {
      setShouldShow(true)
    }
  }, [showOnlyWhenOverflow, content])

  useEffect(() => {
    if (isVisible && wrapperRef.current && tooltipRef.current && shouldShow) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      switch (position) {
        case 'top':
          top = wrapperRect.top - tooltipRect.height - 8
          left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2
          break
        case 'bottom':
          top = wrapperRect.bottom + 8
          left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2
          break
        case 'left':
          top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2
          left = wrapperRect.left - tooltipRect.width - 8
          break
        case 'right':
          top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2
          left = wrapperRect.right + 8
          break
      }

      const padding = 8
      if (left < padding) left = padding
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding
      }
      if (top < padding) top = padding
      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = window.innerHeight - tooltipRect.height - padding
      }

      setTooltipPosition({ top, left })
    }
  }, [isVisible, position, shouldShow])

  if (!shouldShow) {
    return <>{children}</>
  }

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-3 py-2 bg-palette-lightGray text-text-primary text-body2 rounded shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translate(0, 0)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}

