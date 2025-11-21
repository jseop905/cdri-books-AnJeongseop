import { Link, useLocation } from 'react-router-dom'
import { Typography } from '@shared/ui'
import { cn } from '@shared/lib/cn'

export const Header = () => {
  const location = useLocation()

  return (
    <header className="bg-palette-white border-b border-palette-gray py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 flex items-center relative">
        <Typography variant="title1" className="text-text-primary font-bold">
          CERTICOS BOOKS
        </Typography>
        <nav className="flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link 
            to="/" 
            className={cn(
              'text-body1 text-text-primary cursor-pointer relative',
              'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-palette-primary after:transition-all after:duration-200',
              location.pathname === '/' 
                ? 'after:w-full' 
                : 'after:w-0'
            )}
          >
            도서검색
          </Link>
          <Link 
            to="/favorites" 
            className={cn(
              'text-body1 text-text-primary cursor-pointer relative',
              'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-palette-primary after:transition-all after:duration-200',
              location.pathname === '/favorites' 
                ? 'after:w-full' 
                : 'after:w-0'
            )}
          >
            내가 찜한 책
          </Link>
        </nav>
      </div>
    </header>
  )
}

