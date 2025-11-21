import { Link, useLocation } from 'react-router-dom'
import { cn } from '@shared/lib/cn'

export const Header = () => {
  const location = useLocation()

  return (
    <header className="bg-palette-white border-b border-palette-gray h-20 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 flex items-center relative h-full">
        <div className="text-title1 text-text-primary flex items-center">
          CERTICOS BOOKS
        </div>
        <nav className="flex gap-8 items-center absolute left-1/2 -translate-x-1/2 h-full">
          <Link 
            to="/" 
            className={cn(
              'text-body1 text-text-primary cursor-pointer relative flex items-center h-full',
              'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-palette-primary after:transition-all after:duration-200',
              location.pathname === '/' 
                ? 'after:w-full' 
                : 'after:w-0'
            )}
          >
            도서 검색
          </Link>
          <Link 
            to="/favorites" 
            className={cn(
              'text-body1 text-text-primary cursor-pointer relative flex items-center h-full',
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

